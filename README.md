<div align="center">

# 🚀 ngx-otp-inputs

A customizable, **standalone** OTP input component for **Angular 14+** with full **RTL** support, masking, paste handling, auto‑submit, and keyboard navigation.

[![npm version](https://img.shields.io/npm/v/ngx-otp-inputs.svg)](https://www.npmjs.com/package/ngx-otp-inputs)
[![Angular](https://img.shields.io/badge/Angular-14%2B-dd0031)](https://angular.io/)
[![Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000)](https://ngx-otp-inputs-demo.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/magdy-abas/ngx-otp-inputs/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/magdy-abas/ngx-otp-inputs?style=social)](https://github.com/magdy-abas/ngx-otp-inputs/stargazers)

> 💖 If you like this project, please consider giving it a ⭐ on GitHub to support the development!

</div>

---

## Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Compatibility](#-compatibility)
- [Quick Start](#-quick-start)
  - [Standalone Component](#standalone-component)
  - [Reactive Forms](#reactive-forms)
  - [Template-driven Forms](#template-driven-forms)
  - [NgModule Usage](#ngmodule-usage)
- [API](#-api)
  - [Inputs](#inputs)
  - [Outputs](#outputs)
  - [Public Methods](#public-methods)
- [Styling & Theming](#-styling--theming)
- [Mobile & Accessibility](#-mobile--accessibility)
- [Best Practices](#-best-practices)
- [Live Demo](#-live-demo)
- [Development](#-development)
- [License](#-license)
- [Contributing](#-contributing)
- [FAQ](#-faq)

---

## ✨ Features

- ✅ **RTL & LTR Support**
- ✅ **ControlValueAccessor**
- ✅ **Auto Submit**
- ✅ **Auto Blur**
- ✅ **Input Masking**
- ✅ **Paste Handling**
- ✅ **Keyboard Navigation**
- ✅ **Accessibility Ready**
- ✅ **Full Custom Styling**

---

## 📦 Installation

```bash
npm install ngx-otp-inputs
```

> Requires Angular 14+ with **Standalone Component** support.

---

## ✅ Compatibility

- Angular **14+**
- Works with **Reactive Forms** & **Template-driven Forms**
- **SSR-friendly**

---

## ⚡ Quick Start

### Standalone Component

```ts
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@Component({
  standalone: true,
  imports: [NgxOtpInputsComponent],
  template: `<lib-ngx-otp-inputs [length]="6" [maskInput]="false" [autoSubmit]="true" [direction]="'ltr'" (completed)="onCompleted($event)" (changed)="onChanged($event)" />`,
})
export class MyComponent {
  onCompleted(code: string) {
    console.log("Completed:", code);
  }
  onChanged(code: string) {
    console.log("Changed:", code);
  }
}
```

### Reactive Forms

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgxOtpInputsComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <lib-ngx-otp-inputs formControlName="otp" [length]="6" [inputType]="'number'" [inputMode]="'numeric'" [autoSubmit]="true" (completed)="onCompleted($event)"> </lib-ngx-otp-inputs>

      <button type="submit" [disabled]="form.invalid">Submit</button>
      <div *ngIf="form.invalid && form.touched" class="error">Enter 6 digits</div>
    </form>
  `,
})
export class ExampleReactive {
  form = new FormGroup({
    otp: new FormControl("", [Validators.required]),
  });

  onCompleted(code: string) {
    console.log(code);
  }
  submit() {
    console.log(this.form.value);
  }
}
```

### Template-driven Forms

```html
<lib-ngx-otp-inputs [(ngModel)]="otp" [length]="4" [direction]="'rtl'" (completed)="onCompleted($event)"> </lib-ngx-otp-inputs>

<p>Value: {{ otp }}</p>
```

### NgModule Usage

```ts
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, NgxOtpInputsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

---

## 📚 API

### Inputs

| Input          | Type                                                   | Default         | Description                                     |
| -------------- | ------------------------------------------------------ | --------------- | ----------------------------------------------- |
| `length`       | `number`                                               | `4`             | Number of OTP digits                            |
| `direction`    | `'ltr' \| 'rtl'`                                       | `'ltr'`         | Input direction                                 |
| `disabled`     | `boolean`                                              | `false`         | Disables all OTP inputs                         |
| `readonly`     | `boolean`                                              | `false`         | Makes inputs read-only                          |
| `maskInput`    | `boolean`                                              | `false`         | Masks each character as a password              |
| `autoSubmit`   | `boolean`                                              | `false`         | Emits `completed` automatically                 |
| `autoBlur`     | `boolean`                                              | `false`         | Blurs last input on completion                  |
| `autoFocus`    | `boolean`                                              | `true`          | Automatically focuses the first input           |
| `inputType`    | `'number' \| 'text' \| 'alphanumeric'`                 | `'number'`      | Input filtering pattern                         |
| `inputMode`    | `'numeric' \| 'text' \| 'decimal' \| 'tel' \| 'email'` | `'numeric'`     | Helps mobile keyboards                          |
| `inputClass`   | `string`                                               | `'otp-input'`   | Custom CSS class for each OTP input             |
| `wrapperClass` | `string`                                               | `'otp-wrapper'` | Custom CSS class for the wrapper                |
| `ariaLabels`   | `string[]`                                             | `[]`            | Accessibility labels for each input             |
| `status`       | `'success' \| 'failed' \| null`                        | `null`          | Visual state (adds success/error border colors) |

### Outputs

| Output      | Type                   | Description                      |
| ----------- | ---------------------- | -------------------------------- |
| `completed` | `EventEmitter<string>` | Emits OTP when all fields filled |
| `changed`   | `EventEmitter<string>` | Emits OTP on every input change  |

### Public Methods

```ts
@ViewChild(NgxOtpInputsComponent) otp!: NgxOtpInputsComponent;

// Clear all inputs
this.otp.reset();
```

---

## 🎨 Styling & Theming

You can fully style the component using CSS variables:

| Variable                       | Default   |
| ------------------------------ | --------- |
| `--ngx-otp-width`              | `48px`    |
| `--ngx-otp-height`             | `56px`    |
| `--ngx-otp-border-radius`      | `8px`     |
| `--ngx-otp-border-color`       | `#ccc`    |
| `--ngx-otp-focus-border-color` | `#1976d2` |
| `--ngx-otp-font-size`          | `18px`    |
| `--ngx-otp-bg`                 | `#fff`    |
| `--ngx-otp-text-color`         | `#000`    |
| `--ngx-otp-gap`                | `8px`     |

---

## 📱 Mobile & Accessibility

- Use `[inputMode]="'numeric'"` for numeric keyboard on mobile.
- For SMS OTP auto-fill, the first input uses `autocomplete="one-time-code"`.

---

## 🧭 Best Practices

- For numeric OTPs, prefer `[inputType]="'number'"`.
- Fix `length` and rely on form validation.
- Prefer `inputMode="numeric"` over `type="number"` on mobile.

---

## 🧑‍💻 Development

```bash
# Clone repository
git clone https://github.com/magdy-abas/ngx-otp-inputs
cd ngx-otp-inputs

# Run demo locally
cd demo
npm i
npm start

# Build the library
cd ../projects/ngx-otp-inputs
npm run build
```

---

## 📄 License

[MIT License](https://github.com/magdy-abas/ngx-otp-inputs/blob/master/LICENSE) — free for commercial and personal use.

---

## 🤝 Contributing

PRs & issues are welcome!

---

## ❓ FAQ

**Q: Why not use a single `<input>` with a mask?**  
A: Multi-input UX gives clearer visual progress and works better with paste + mobile keyboards.

**Q: Does it work with SSR?**  
A: Yes. The component avoids direct DOM globals, so it’s SSR-friendly.

**Q: How do I programmatically set the value?**  
A: If you’re using Reactive Forms, `patchValue({ otp: '123456' })` will distribute characters automatically.
