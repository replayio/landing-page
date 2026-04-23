# Security & Privacy (Replay) — agent summary

**Canonical URL (authoritative HTML):** https://www.replay.io/security-and-privacy  

**Important:** This Markdown summarizes the in-repo **Security** overview component. It is **not** a complete security whitepaper and **not** a replacement for the HTML page, SOC reports, or your own diligence.

---

## Document control (from live page)

- **Title:** Security & Privacy  
- **Effective date:** 28 MAR 2023  
- **Last reviewed:** 27 May 2025  

---

## Compliance reporting

Replay.io states it continuously monitors and reports primarily using **SOC 2 Type 2**. **Copies of the report** are available by contacting **Support** (mailto linked on page — **support@replay.io** in the security component’s compliance paragraph).

---

## Secure development (SDLC)

Replay describes a secure SDLC for infrastructure and application updates, including:

- Code reviews  
- Source control access restrictions  
- Source code dependency scanning  
- Comprehensive audit & deployment logging  
- Separated testing and production environments  

---

## Encryption

- **SSL Labs** — cited as **A+** rating around SSL configuration (as stated on page).  
- **TLS** — minimum **TLS v1.2** for encryption in transit.  
- **At rest** — **AES 256** for data at rest.  

---

## Authentication

**Google SAML 2.0** SSO is supported, including **MFA**, automated account provisioning/revocation, and related features; controls are described as being in customers’ hands.

---

## Access control

**Least privilege** for access within the organization; key-system access reviewed **at least annually**; **MFA** enabled for users to protect application and infrastructure.

---

## Network security

Includes **security team reviews of firewall rules** and **intelligent threat detection tools** monitoring the environment.

---

## Privacy principles (product stance)

Replay emphasizes responsibility because the product can observe program behavior. Stated commitments include:

- Minimize data collection  
- **Replay does not sell customer data**  
- Customer data is **not accessed** in Replay’s **normal course of business**  
- Replay **does not view or analyze your replays** without **explicit permission**  

---

## Session replay (LogRocket)

Replay uses **LogRocket** to record user sessions for diagnosis and product understanding. Bullets on the page include:

- LogRocket can be disabled in **Preferences**  
- Sensitive user information is **redacted**  
- **Intellectual property** such as source code, filenames, and runtime data is **redacted**  
- DevTools are **public on GitHub** (link on page) and feedback is welcome on additional redaction needs  

---

## Questions

**security@replay.io** — listed under “Additional Information” for security questions.

---

## Related policies

- Privacy Policy: https://www.replay.io/privacy-policy  
- Terms of Use: https://www.replay.io/terms-of-service  
