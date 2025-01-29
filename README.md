# 🛍️ BE Case study

## 📋 Table of Contents

- [🛍️ BE Case study](#️-be-case-study)
  - [📋 Table of Contents](#-table-of-contents)
  - [🛠️ Prerequisites](#️-prerequisites)
  - [📥 Installation](#-installation)
  - [🗄️ Configuration](#️-configuration)
  - [🗄️ Running the App on local](#️-running-the-app-on-local)
  - [🚀 Live API documents](#-live-api-documents)
    - [Swagger documents](#swagger-documents)

## 🛠️ Prerequisites

- Node.js 18+ 🟢
- npm 9+ 📦
- GROQ API KEY ( Mandatory : [get api key](https://groq.com/) )
- DEEPSEEK API KEY ( Optional : [get api key](https://www.deepseek.com/) )

## 📥 Installation

```bash
# Clone repository
git clone git@github.com:amirofy2002/case-study-beta-limited-backend.git

# Install dependencies
cd case-study-beta-limited-backend && npm install

# Create environment file
cp .env.example .env

```

## 🗄️ Configuration

```bash
# Default port
port = 3001

# GROQ api key
GROQ_API_KEY=
# GROQ default model
GROQ_MODEL = llama3-70b-8192

# DEEPSEEK section is optional
DEEPSEEK_API_KEY =
DEEPSEEK_MODEL = deepseek-chat
```

## 🗄️ Running the App on local

Launches the NestJS app in production mode (static build).

```bash
"start": "nest start"
```

Runs NestJS in development with live reload on file changes.

```bash
"start:dev": "nest start --watch"
```

## 🚀 Live API documents

### Swagger documents

[Click here to see live deployment](https://case-study-beta-limited-backend.onrender.com/)
