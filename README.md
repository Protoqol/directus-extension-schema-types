![Title card](https://raw.githubusercontent.com/Protoqol/directus-extension-schema-types/main/.github/assets/title_card.png)

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

#### See [Generated code](#generated-code) for a preview.

---

## Installation

There are a few different ways to install this extension:

1.
    - (Recommended) Via Directus Marketplace search for `schema-types`
    - Go to `YOUR_DIRECTUS_URL/admin/settings/marketplace/extension/41ae62cf-ee7f-483f-80d9-5572690a2976` and install
      from there
    - Self-hosted: see [Directus Docs](https://directus.io/docs/self-hosting/including-extensions) to install
      extensions.
2. Enable the module in Settings > Modules > Module Bar > Schema Types.

---

## Generated code

Wondering what the generated code looks like?

![Preview Rust (with serde)](https://raw.githubusercontent.com/Protoqol/directus-extension-schema-types/main/.github/assets/preview_2.png)
> Converting the collection `geography` to Rust with serde enabled - you can also export without serde. Also note the
> automatically included geometry types, completely free of charge!
---

![Preview Python 3.9](https://raw.githubusercontent.com/Protoqol/directus-extension-schema-types/main/.github/assets/preview.png)
> Converting all collections to Python 3.9 has never been easier.
---

## Feedback, suggestions or issues?

Please open an issue on this repository. We're happy to hear back from you!

---

Developed by [Protoqol](https://protoqol.nl/).



