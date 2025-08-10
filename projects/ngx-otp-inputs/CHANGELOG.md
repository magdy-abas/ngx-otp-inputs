# Changelog

## [1.1.2] - 2025-08-10

### Added

- Added `autocomplete="one-time-code"` to the first OTP input for better mobile browser autofill.
- Enabled `autoFocus` by default to automatically focus on the first OTP input.

### Changed

- Updated `writeValue` to handle initial value rendering more reliably.

### Fixed

- Improved input value rendering using `ChangeDetectorRef` and `queueMicrotask`.

---

[1.1.2]: https://github.com/magdy-abas/ngx-otp-inputs/compare/v1.0.0...v1.1.2
