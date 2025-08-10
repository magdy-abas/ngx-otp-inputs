# Changelog

## [1.1.0] - 2025-08-10

### Added

- Added `autocomplete="one-time-code"` to the first OTP input for better mobile browser autofill.
- Enabled `autoFocus` by default to focus the first input automatically.

### Changed

- Updated `writeValue` to handle initial value rendering more reliably.

### Fixed

- Improved input value rendering with `ChangeDetectorRef` and `queueMicrotask`.
