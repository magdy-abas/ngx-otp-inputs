# 🚀 ngx-otp-inputs

> A customizable, **standalone** OTP input component for **Angular 14+** with full **RTL** support, masking, paste handling, auto-submit, and keyboard navigation.

[![npm version](https://img.shields.io/npm/v/ngx-otp-inputs.svg)](https://www.npmjs.com/package/ngx-otp-inputs)
[![Angular](https://img.shields.io/badge/Angular-14%2B-dd0031)](https://angular.io/)
[![Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000)](https://ngx-otp-inputs-demo.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/magdy-abas/ngx-otp-inputs/blob/master/LICENSE)

---

## 📦 Installation

```bash
npm install ngx-otp-inputs
```

> Requires Angular 14+ with **Standalone Component** support.

---

## ⚡ Usage

### 1) Standalone + Reactive Forms

```ts
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgxOtpInputsComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <lib-ngx-otp-inputs formControlName="otp" [length]="6" [inputType]="'number'" [inputMode]="'numeric'" [autoSubmit]="true" [direction]="'ltr'" [disabled]="false" [status]="status" (completed)="submit()"> </lib-ngx-otp-inputs>

      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
})
export class ExampleReactive {
  status: "success" | "failed" | null = null;

  form = new FormGroup({
    otp: new FormControl("", [Validators.required]),
  });

  submit() {
    const code = this.form.value.otp ?? "";
    // TODO: verify code via API, then set visual status:
    this.status = code ? "success" : "failed";
    console.log(code);
  }
}
```

---

### 2) Using with NgModule

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxOtpInputsComponent, // ✅ Import directly here
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<lib-ngx-otp-inputs [(ngModel)]="otp" [length]="6" [autoSubmit]="true" (completed)="onCompleted($event)"> </lib-ngx-otp-inputs>

<p>OTP Value: {{ otp }}</p>
```

```ts
// app.component.ts
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  otp = "";

  onCompleted(code: string) {
    console.log("Completed:", code);
  }
}
```

---

## 🎯 Inputs & Outputs

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

---

## 🛠 Public Methods

### reset()

Clears all input boxes.

**Example:**

```ts
import { Component, ViewChild } from "@angular/core";
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@Component({
  standalone: true,
  imports: [NgxOtpInputsComponent],
  template: `
    <lib-ngx-otp-inputs #otp [length]="6"></lib-ngx-otp-inputs>
    <button (click)="resetOtp()">Reset</button>
  `,
})
export class ResetExample {
  @ViewChild("otp") otp!: NgxOtpInputsComponent;

  resetOtp() {
    this.otp.reset();
  }
}
```

---

## 🎨 Styling

Customize with CSS variables:

```css
:root {
  --ngx-otp-width: 48px;
  --ngx-otp-height: 56px;
  --ngx-otp-border-radius: 8px;
  --ngx-otp-border-color: #ccc;
  --ngx-otp-focus-border-color: #1976d2;
  --ngx-otp-font-size: 18px;
  --ngx-otp-bg: #fff;
  --ngx-otp-text-color: #000;
  --ngx-otp-gap: 8px;
}
```

**Status helpers** (applied automatically when `[status]` is set):

```css
.otp-success .otp-input {
  border-color: #10b981 !important;
} /* success */
.otp-failed .otp-input {
  border-color: #ef4444 !important;
} /* failed  */
```

---

## 🌐 Live Demo

Try it here: https://ngx-otp-inputs-demo.vercel.app

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/magdy-abas/ngx-otp-inputs/issues).

---

## 📄 License

[MIT License](https://github.com/magdy-abas/ngx-otp-inputs/blob/master/LICENSE)
