import fs from 'node:fs'
import path from 'node:path'

type StageStatus = 'PASS' | 'WARN' | 'FAIL'
type StageCategory =
  | 'governance'
  | 'quality'
  | 'security'
  | 'delivery'
  | 'deployment'
  | 'observability'

type ReleaseStage = {
  name: string
  category: StageCategory
  required: boolean
  status: StageStatus
  evidence: string
}

type ReleaseConfig = {
  releaseName: string
  version: string
  environment: string
  requestedBy: string
  approvalRequired: boolean
  stages: ReleaseStage[]
}

type ReleaseDecision = 'APPROVED_FOR_PRODUCTION' | 'APPROVED_WITH_WARNINGS' | 'BLOCKED'

type ReleaseReport = {
  generatedAtUtc: string
  releaseName: string
  version: string
  environment: string
  requestedBy: string
  approvalRequired: boolean
  totalStages: number
  passedStages: number
  warningStages: number
  failedStages: number
  requiredFailures: number
  decision: ReleaseDecision
  summary: string
  stages: ReleaseStage[]
}

const rootDir = process.cwd()
const configPath = path.join(rootDir, 'config', 'release-pipeline.json')
const reportsDir = path.join(rootDir, 'reports')

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const jsonReportPath = path.join(reportsDir, `release-report-${timestamp}.json`)
const markdownReportPath = path.join(reportsDir, `release-report-${timestamp}.md`)

function ensureReportsDirectory() {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true })
  }
}

function readReleaseConfig(): ReleaseConfig {
  const raw = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(raw) as ReleaseConfig
}

function evaluateRelease(config: ReleaseConfig): ReleaseReport {
  const passedStages = config.stages.filter((stage) => stage.status === 'PASS').length
  const warningStages = config.stages.filter((stage) => stage.status === 'WARN').length
  const failedStages = config.stages.filter((stage) => stage.status === 'FAIL').length
  const requiredFailures = config.stages.filter(
    (stage) => stage.required && stage.status === 'FAIL'
  ).length

  let decision: ReleaseDecision = 'APPROVED_FOR_PRODUCTION'

  if (requiredFailures > 0) {
    decision = 'BLOCKED'
  } else if (warningStages > 0 || failedStages > 0) {
    decision = 'APPROVED_WITH_WARNINGS'
  }

  const summary =
    decision === 'APPROVED_FOR_PRODUCTION'
      ? 'All required release gates passed. Production deployment is approved.'
      : decision === 'APPROVED_WITH_WARNINGS'
        ? 'Release can continue, but warnings must be reviewed and tracked.'
        : 'Release is blocked because one or more required gates failed.'

  return {
    generatedAtUtc: new Date().toISOString(),
    releaseName: config.releaseName,
    version: config.version,
    environment: config.environment,
    requestedBy: config.requestedBy,
    approvalRequired: config.approvalRequired,
    totalStages: config.stages.length,
    passedStages,
    warningStages,
    failedStages,
    requiredFailures,
    decision,
    summary,
    stages: config.stages
  }
}

function toMarkdown(report: ReleaseReport) {
  const stageRows = report.stages
    .map(
      (stage) =>
        `| ${stage.name} | ${stage.category} | ${stage.required ? 'Yes' : 'No'} | ${stage.status} | ${stage.evidence} |`
    )
    .join('\n')

  return `# Release Pipeline Report

## Summary

- Generated at UTC: ${report.generatedAtUtc}
- Release: ${report.releaseName}
- Version: ${report.version}
- Environment: ${report.environment}
- Requested by: ${report.requestedBy}
- Decision: ${report.decision}
- Summary: ${report.summary}

## Metrics

- Total stages: ${report.totalStages}
- Passed stages: ${report.passedStages}
- Warning stages: ${report.warningStages}
- Failed stages: ${report.failedStages}
- Required failures: ${report.requiredFailures}

## Stages

| Stage | Category | Required | Status | Evidence |
| --- | --- | --- | --- | --- |
${stageRows}
`
}

function main() {
  ensureReportsDirectory()

  const config = readReleaseConfig()
  const report = evaluateRelease(config)

  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2), 'utf8')
  fs.writeFileSync(markdownReportPath, toMarkdown(report), 'utf8')

  console.log('RESULTADO=RELEASE_PIPELINE_EVALUATED')
  console.log(`RELEASE=${report.releaseName}`)
  console.log(`VERSION=${report.version}`)
  console.log(`ENVIRONMENT=${report.environment}`)
  console.log(`STAGES=${report.totalStages}`)
  console.log(`DECISION=${report.decision}`)
  console.log(`JSON=${jsonReportPath}`)
  console.log(`MARKDOWN=${markdownReportPath}`)
}

main()
