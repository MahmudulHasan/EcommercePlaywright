# EcommercePlaywright

![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-green?style=flat&logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue?style=flat&logo=typescript)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD%20Testing-brightgreen?style=flat&logo=cucumber)

## 📌 Project Overview
EcommercePlaywright is an automated end-to-end (E2E) testing framework built using **Playwright**, **TypeScript**, and **Cucumber**. It is designed to test the functionalities of [Practice Software Testing](https://practicesoftwaretesting.com/) efficiently.

## ✨ Features
- 🏆 Automated E2E testing with Playwright.
- ✅ Behavior-Driven Development (BDD) using Cucumber.
- 🌐 Cross-browser testing (Chrome, Firefox, Edge, WebKit).
- 📄 Page Object Model (POM) for better test maintenance.
- 📊 HTML test reports for result visualization.

## 🚀 Installation
### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**
- **Playwright** dependencies

### Steps
```sh
# Clone the repository
git clone https://github.com/MahmudulHasan/EcommercePlaywright.git
cd EcommercePlaywright

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🔧 Project Structure
```
EcommercePlaywright/
│── features/            # Cucumber feature files
│── step-definitions/    # Step definition implementations
│── page-objects/       # Page Object Model (POM) files
│── hooks/              # Hooks for setup and teardown
│── utils/              # Utility functions
│── playwright.config.ts # Playwright configuration
│── cucumber.json       # Cucumber configuration
│── package.json        # Project dependencies
```

## 🎯 Running Tests
Run all tests
```sh
npx cucumber-js
```
Run tests with @regression tag
```sh
npx cucumber-js --tags "@regression"
```

## ⚙️ Configuration
Modify `playwright.config.ts` to update browser settings, timeouts, and test retries.

## 🤝 Contributing
Contributions are welcome! Please open an issue or create a pull request.

## 📜 License
This project is licensed under the **MIT License**.

---

💡 **Happy Testing!** 🏆
