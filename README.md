# Demo Técnica DevOps Release Pipeline

[![DevOps Release Pipeline CI](https://github.com/DiegoG-420/technical-demo-devops-release-pipeline/actions/workflows/devops-release-pipeline-ci.yml/badge.svg)](https://github.com/DiegoG-420/technical-demo-devops-release-pipeline/actions/workflows/devops-release-pipeline-ci.yml)


Simulador de pipeline de release empresarial construido con Node.js y TypeScript para evaluar etapas de entrega, validar gates de calidad, seguridad, aprobación y despliegue, y generar reportes en formato JSON y Markdown.

Esta demo forma parte de mi portafolio técnico profesional y muestra un flujo controlado de entrega de software con enfoque en CI/CD, release management, validación operativa y evidencia de despliegue.

## Objetivo

Crear una demo funcional que represente un proceso de entrega técnica controlada.

El simulador permite:

- Leer una configuración de pipeline desde JSON.
- Evaluar etapas requeridas y no requeridas.
- Validar estados PASS, WARN y FAIL.
- Detectar fallas bloqueantes.
- Determinar si un release puede avanzar a producción.
- Generar una decisión de release.
- Exportar reporte JSON.
- Exportar reporte Markdown.

## Enfoque técnico

Esta demo no despliega infraestructura real.

Representa el flujo lógico de un pipeline DevOps empresarial, donde cada etapa genera evidencia y una decisión final de liberación.

La intención es demostrar criterio técnico en:

- CI/CD.
- Release management.
- Quality gates.
- Approval gates.
- Deployment validation.
- Post-deploy checks.
- Documentación de evidencia.

## Stack técnico

- Node.js
- TypeScript
- TSX
- JSON
- Markdown
- Git

## Etapas simuladas

El pipeline evalúa las siguientes etapas:

- Source Control.
- Build.
- Automated Tests.
- Security Check.
- Package.
- Deploy Staging.
- Approval Gate.
- Deploy Production.
- Post-Deploy Validation.

## Flujo de ejecución

La demo lee el archivo:

    config/release-pipeline.json

Procesa las etapas de release y genera salidas en:

    reports/

Los archivos generados se excluyen del repositorio porque son artefactos de ejecución.

## Decisiones posibles

El simulador puede generar tres decisiones:

    APPROVED_FOR_PRODUCTION
    APPROVED_WITH_WARNINGS
    BLOCKED

## Indicadores generados

- Total de etapas.
- Etapas aprobadas.
- Etapas con advertencias.
- Etapas fallidas.
- Fallas en etapas requeridas.
- Decisión final del release.
- Evidencia por etapa.

## Cómo ejecutar localmente

Desde la raíz del repositorio:

    npm install
    npm run release

## Cómo compilar

Desde la raíz del repositorio:

    npm run build

## Scripts disponibles

    npm run dev
    npm run build
    npm run start
    npm run release

## Ejemplo de salida en consola

    RESULTADO=RELEASE_PIPELINE_EVALUATED
    RELEASE=Portfolio Technical Demo Release
    VERSION=1.0.0
    ENVIRONMENT=production
    STAGES=9
    DECISION=APPROVED_FOR_PRODUCTION
    JSON=reports/release-report-fecha.json
    MARKDOWN=reports/release-report-fecha.md

## Ejemplo de decisión

Cuando todas las etapas requeridas se encuentran en estado PASS, el release queda aprobado para producción:

    APPROVED_FOR_PRODUCTION

Si existe una advertencia no bloqueante, el release puede avanzar con seguimiento:

    APPROVED_WITH_WARNINGS

Si una etapa requerida falla, el release se bloquea:

    BLOCKED

## Estructura del proyecto

    technical-demo-devops-release-pipeline/
      config/
        release-pipeline.json
      src/
        index.ts
      reports/
        archivos generados localmente
      .gitignore
      package.json
      package-lock.json
      tsconfig.json
      README.md


## Integración continua

El repositorio incluye un workflow de GitHub Actions para validar automáticamente el proyecto en cada push o pull request hacia la rama main.

El pipeline ejecuta:

- Instalación limpia de dependencias con npm ci.
- Build de TypeScript.
- Evaluación del pipeline de release.
- Generación de reporte JSON y Markdown como artefactos locales de ejecución.

Archivo del workflow:

    .github/workflows/devops-release-pipeline-ci.yml

## Estado actual

- Simulador de release funcional.
- Build TypeScript validado.
- Lectura de configuración JSON.
- Evaluación de etapas PASS/WARN/FAIL.
- Decisión final de release.
- Exportación JSON.
- Exportación Markdown.
- Rama principal: main.

## Uso de herramientas de IA

Este proyecto fue desarrollado como demo técnica personal. Durante el proceso se utilizaron herramientas de IA como apoyo para acelerar documentación, revisión de estructura, generación de ideas y validación de enfoque.

Las decisiones técnicas, pruebas, ajustes, commits y publicación del repositorio fueron realizadas y validadas por el autor.

## Roadmap

Próximas mejoras planeadas:

- Agregar pruebas automatizadas.
- Agregar GitHub Actions CI.
- Agregar escenarios WARN y BLOCKED.
- Agregar validación de configuración.
- Agregar reporte ejecutivo.
- Agregar matriz de riesgos por etapa.
- Publicar repositorio en GitHub.
- Conectar esta demo al portafolio personal.

## Autor

Diego Garrido E.

Software Engineer enfocado en backend, APIs, automatización, integración, frontend empresarial, DevOps, IA aplicada y sistemas reales.

Portafolio:

    https://portfolio.ssitecnologicos.com


