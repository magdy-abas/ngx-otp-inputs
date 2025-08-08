# ngx-otp-inputs

[![npm version](https://img.shields.io/npm/v/ngx-otp-inputs.svg)](https://www.npmjs.com/package/ngx-otp-inputs)
[![npm downloads](https://img.shields.io/npm/dm/ngx-otp-inputs.svg)](https://www.npmjs.com/package/ngx-otp-inputs)
[![license](https://img.shields.io/github/license/magdy-abas/ngx-otp-inputs)](LICENSE)
[![last commit](https://img.shields.io/github/last-commit/magdy-abas/ngx-otp-inputs)](https://github.com/magdy-abas/ngx-otp-inputs/commits/master)

A customizable, standalone OTP input component for Angular 14+ with full RTL support, masking, paste handling, auto-submit, and keyboard navigation.

---

## 📦 Installation

```bash
npm install ngx-otp-inputs
```

> Requires Angular 14+ with Standalone Component support.

---

## 🚀 Usage

### In a standalone component:

```ts
import { NgxOtpInputsComponent } from "ngx-otp-inputs";

@Component({
  standalone: true,
  imports: [NgxOtpInputsComponent],
  template: ` <lib-ngx-otp-inputs [length]="6" [maskInput]="true" [autoSubmit]="true" [direction]="'ltr'" (completed)="onCompleted($event)" (changed)="onChanged($event)" /> `,
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

---

## 🎯 Features

| Feature                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| ✅ RTL & LTR Support    | Direction auto-adjusted for RTL languages like Arabic or Hebrew           |
| ✅ ControlValueAccessor | Works with Reactive & Template Forms (via `[(ngModel)]` or `formControl`) |
| ✅ Auto Submit          | Automatically emits `completed` when all inputs are filled                |
| ✅ Auto Blur            | Automatically blurs last input if `autoBlur` is enabled                   |
| ✅ Input Masking        | Mask input as password using `[maskInput]="true"`                         |
| ✅ Paste Handling       | Smart pasting support — auto fills all fields                             |
| ✅ Arrow Key Navigation | Use left/right arrows to move between inputs                              |
| ✅ Accessibility Ready  | `aria-labels`, `aria-required`, and keyboard friendly                     |
| ✅ Reset Support        | Call `.reset()` method to clear all input values                          |
| ✅ Full Custom Styling  | Easily override styles via CSS variables or custom classes                |

---

## ⚙️ Inputs

| Input          | Type                                   | Default         | Description                              |
| -------------- | -------------------------------------- | --------------- | ---------------------------------------- |
| `length`       | `number`                               | `4`             | Number of OTP digits                     |
| `direction`    | `'ltr' \| 'rtl'`                       | `'ltr'`         | Input direction                          |
| `readonly`     | `boolean`                              | `false`         | Makes input read-only                    |
| `disabled`     | `boolean`                              | `false`         | Disables all input fields                |
| `maskInput`    | `boolean`                              | `false`         | Masks each character as a password       |
| `autoSubmit`   | `boolean`                              | `false`         | Emits `completed` automatically          |
| `autoBlur`     | `boolean`                              | `false`         | Blurs last input on completion           |
| `inputType`    | `'number' \| 'text' \| 'alphanumeric'` | `'number'`      | Input filtering pattern                  |
| `inputMode`    | HTML inputmode string                  | `'numeric'`     | Helps mobile keyboards (text, tel, etc.) |
| `inputClass`   | `string`                               | `'otp-input'`   | CSS class for each input                 |
| `wrapperClass` | `string`                               | `'otp-wrapper'` | CSS class for the wrapper                |
| `ariaLabels`   | `string[]`                             | `[]`            | Accessible labels for screen readers     |
| `status`       | `'success' \| 'failed' \| null`        | `null`          | Adds success/error border colors         |

---

## 🔄 Outputs

| Output      | Type                   | Description                      |
| ----------- | ---------------------- | -------------------------------- |
| `completed` | `EventEmitter<string>` | Emits OTP when all fields filled |
| `changed`   | `EventEmitter<string>` | Emits OTP on every input change  |

---

## 🔧 Public Methods

You can call these methods via `@ViewChild()` if needed.

```ts
@ViewChild(NgxOtpInputsComponent) otp!: NgxOtpInputsComponent;

this.otp.reset(); // Clears all input fields
```

---

## 🎨 Custom Styling via CSS Variables

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

## 🧪 Coming Soon

- Unit tests with Jest
- Demo playground on Stackblitz
- Dark mode + theme presets
- Storybook integration

---

## 📄 License

MIT — free to use for commercial and personal projects.

---

## 🤝 Contributing

Pull requests and issues are welcome!  
Feel free to submit improvements or new features.
