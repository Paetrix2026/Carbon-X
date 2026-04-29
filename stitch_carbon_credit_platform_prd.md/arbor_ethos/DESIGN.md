# Design System Documentation: The "Verdant Ledger" Editorial Framework

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Institutional Naturalist."** 

Unlike generic marketplaces that lean into loud, consumer-focused aesthetics, this system treats environmental data with the reverence of a high-end financial journal. We bridge the gap between "Climate Tech" and "Institutional Finance." 

The design breaks the "template" look through **Intentional Asymmetry**. We move away from the rigid 12-column grid in favor of an editorial layout where large, "Manrope" display type creates a focal point, and content blocks are offset to allow for white space to act as a breathing, organic element. This isn't just a marketplace; it is a curated portfolio of planetary health.

---

## 2. Colors: The Tonal Landscape
We use a sophisticated palette that trades high-contrast "neon" greens for deep, atmospheric forest tones and professional slates.

### The Palette
- **Primary Architecture:** `primary` (#003527) and `primary_container` (#064e3b). These represent the "Deep Forest"—stable, rooted, and high-value.
- **Action & Growth:** `secondary` (#006c49) and `secondary_fixed` (#6ffbbe). Used for key conversion moments and growth indicators.
- **Neutral Ground:** A sophisticated range of `surface` (#f9f9ff) through `surface_container_highest` (#d8e3fb). These are slightly cool-tinted to ensure the green accents feel vibrant rather than muddy.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning content. Boundaries must be defined solely through:
1. **Background Color Shifts:** A `surface_container_low` section sitting against a `surface` background.
2. **Tonal Transitions:** Using the hierarchy of container tokens to define the edge of a workspace.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. To create depth without "clutter," nest surfaces using the Material convention:
- **Base Layer:** `surface`
- **In-Page Sections:** `surface_container_low`
- **Primary Cards:** `surface_container_lowest` (for a "lifted" paper effect)
- **Interactive Modals:** `surface_container_high`

### The "Glass & Gradient" Rule
To add visual "soul," use subtle linear gradients (15° angle) transitioning from `primary` to `primary_container` for hero backgrounds. For floating navigation or overlays, apply **Glassmorphism**: use `surface_variant` at 70% opacity with a `24px` backdrop-blur.

---

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with data-driven clarity.

| Category | Token | Font | Size | Weight | Character |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | 700 | Architectural, Bold |
| **Headline** | `headline-md`| Manrope | 1.75rem | 600 | Authoritative |
| **Title** | `title-lg` | Inter | 1.375rem| 600 | Professional |
| **Body** | `body-md` | Inter | 0.875rem| 400 | Highly Readable |
| **Label** | `label-md` | Inter | 0.75rem | 500 | Precise (All-Caps opt) |

**The Strategy:** Use `Manrope` for large, expressive headlines to establish the "Established" feel. Use `Inter` for all functional data, inputs, and long-form descriptions to ensure maximum transparency and legibility.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to solve layout problems. We use Tonal Layering.

- **The Layering Principle:** Place a `surface_container_lowest` card (Pure White #ffffff) on a `surface_container_low` (#f0f3ff) background. This creates a "soft lift" that feels architectural rather than digital.
- **Ambient Shadows:** When a card must "float" (e.g., a hover state), use an extra-diffused shadow: `Y: 8px, B: 32px, Color: on_surface @ 6%`. Never use pure black for shadows; always use a tinted neutral.
- **The "Ghost Border" Fallback:** If a container sits on a background of the same color, use a "Ghost Border": `outline_variant` (#bfc9c3) at **15% opacity**.
- **Edge Softness:** Use the `md` (12px/0.75rem) corner radius for cards and `full` for interactive chips.

---

## 5. Components

### Buttons (The "Signature" Call-to-Action)
- **Primary:** `primary` background with `on_primary` text. Use a subtle 2px inner-glow on top for a "premium" embossed feel.
- **Secondary:** `surface_container_highest` background with `on_secondary_container` text.
- **Sizing:** Large buttons should have a `1.5rem` horizontal padding and a `0.75rem` vertical padding.

### Cards & Data Modules
- **Rule:** Forbid divider lines. 
- **Guidance:** Separate the project title from the carbon credit value using `1.5rem` (xl) vertical spacing or a subtle `surface_variant` background fill for the footer of the card.
- **Imagery:** Cards must use high-quality, desaturated nature photography. Overlays should use `primary_container` at 40% opacity to "brand" the image.

### Carbon Impact Chips
- **Selection Chips:** Use `secondary_fixed_dim` (#4edea3) with `on_secondary_fixed` text for positive environmental metrics.
- **Shape:** Pill-shaped (`9999px`) to contrast against the 12px card corners.

### Input Fields
- **State:** `surface_container_lowest` fill with a `Ghost Border`. On focus, the border transitions to `primary` with a 2px "Soft Halo" (shadow) of the same color at 10% opacity.

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical margins. For example, a left-aligned headline with a right-aligned descriptive paragraph.
- **Do** lean into `surface_dim` for "Data Rooms" or "White Papers" to reduce eye strain and feel premium.
- **Do** use high-quality, atmospheric imagery of forests, oceans, and wind farms.

### Don't
- **Don't** use 100% black (#000000) for text. Always use `on_surface` (#111c2d).
- **Don't** use standard "Success Green." Use our `secondary` or `emerald` tokens to keep the brand identity intact.
- **Don't** use 1px dividers between list items. Use `8px` of vertical white space and a background color shift on hover.
- **Don't** use sharp 0px corners. It breaks the "Naturalist" North Star. 

---

## 7. Signature Elements for Carbon Markets
*   **The "Provenance" Stamp:** A small, circular badge using `tertiary_fixed` to denote verified, high-quality offsets.
*   **The Impact Graph:** Use `secondary` for positive growth lines and `primary_fixed_dim` for historical baselines—avoiding the "red/green" financial cliché.