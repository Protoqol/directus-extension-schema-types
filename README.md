![Title card](https://cms.protoqol.nl/assets/e2e36b88-ed51-44ae-9d07-91b710d05efc)

![NPM](https://img.shields.io/npm/v/%40protoqol%2Fdirectus-extension-schema-types)
![NPM](https://img.shields.io/github/actions/workflow/status/protoqol/directus-extension-schema-types/publish.yml)

## Features

- **Multi-language Support**: Generate schemas/types for TypeScript, Rust, PHP, C#, Java, Python, Go, Kotlin, C++, Ruby,
  SQL,
  and GraphQL.
- **Geography Support**: Includes custom types for geography fields (no dependencies needed).
- **Relationships included**: Handles relationships between collections, generating nested types where appropriate.
- **Fine-grained control**: Choose specific fields or entire collections to generate schemas for.
- **All versions of your favorite language** Java 8 up to 21, Python 3.6 up to 3.11

#### See [What does the generated code look like?](#what-does-the-generated-code-look-like) for a preview.

## Installation

There are a few different ways to install this extension:

1.
    - (Recommended) Via Directus Marketplace search for `schema-types` or go to
      `{{ YOUR_DIRECTUS_URL }}/admin/settings/marketplace/extension/!!TODO!!` // Coming soon!
    - Self-hosted: see [Directus Docs](https://directus.io/docs/self-hosting/including-extensions) to install
      extensions.
2. Enable the module in Settings > Modules > Module Bar > Schema Types.

## What does the generated code look like?

Wondering what the generated code looks like?

![Preview Rust (with serde)](https://cms.protoqol.nl/assets/4b4c7d6d-6ffe-4cf4-bac0-74e3c75ae8db)
> Converting the collection `geography` to Rust (with serde enabled, you can also export without serde). Also note the
> automatically included geometry types, completely free of charge!

![Preview Python 3.9](https://cms.protoqol.nl/assets/209316ac-e033-4190-85f4-e5d529649796)
> Converting all collections in one go to Python 3.9!

## Feedback, suggestions or issues?

Please open an issue on this repository. We're happy to hear back from you!

---

Developed by [Protoqol](https://protoqol.nl/).
