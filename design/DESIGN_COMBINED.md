# Design reference

Source: https://www.firstcry.com/
Page: 3 pages from www.firstcry.com: /, /boutique/new-arrivals-up-to-14y/40739, /hola-bonita/hola-bonita-cold-shoulder-frock-floral-print-coral/9937627/product-detail

Measured from 513 rendered elements at 1280 x 873px. This is a sample of the current document and state, not the original design source.

## Color palette

Only observed CSS colors are listed. Usage labels describe where a color was found. Hex is an sRGB preview; retain the original CSS value for its color space and transparency.

Usage | Original CSS value | sRGB hex | Observed root properties | Occurrences
--- | --- | --- | --- | ---
Text | rgb(87, 87, 87) | #575757 |  | 55
Text | rgb(72, 72, 72) | #484848 |  | 39
Text | rgb(97, 97, 97) | #616161 |  | 35
Text | rgb(54, 54, 54) | #363636 |  | 23
Text | rgb(33, 33, 33) | #212121 |  | 17
Text | rgb(158, 158, 158) | #9E9E9E |  | 12
Text | rgb(66, 66, 66) | #424242 |  | 11
Text | rgb(117, 117, 117) | #757575 |  | 10
Text | rgb(149, 149, 149) | #959595 |  | 8
Text | rgb(20, 106, 255) | #146AFF |  | 8
Text | rgb(252, 59, 59) | #FC3B3B |  | 7
Text | rgb(255, 112, 67) | #FF7043 |  | 7
Text | rgb(255, 255, 255) | #FFFFFF |  | 7
Text | rgb(7, 69, 125) | #07457D |  | 4
Text | rgb(224, 52, 0) | #E03400 |  | 4
Text | rgb(32, 136, 51) | #208833 |  | 3
Surface | rgb(255, 255, 255) | #FFFFFF |  | 13
Surface | rgb(111, 195, 65) | #6FC341 |  | 3
Surface | rgb(248, 248, 248) | #F8F8F8 |  | 2
Surface | rgb(61, 61, 61) | #3D3D3D |  | 1
Border | rgb(212, 212, 212) | #D4D4D4 |  | 20
Border | rgb(218, 218, 218) | #DADADA |  | 8
Border | rgb(245, 245, 245) | #F5F5F5 |  | 8
Border | rgb(255, 255, 255) | #FFFFFF |  | 3
Border | rgb(0, 0, 0) | #000000 |  | 2
Border | rgb(54, 54, 54) | #363636 |  | 1
Border | rgb(45, 45, 45) | #2D2D2D |  | 1
Border | rgb(224, 224, 224) | #E0E0E0 |  | 1

## Typography

Role | Family | Size | Weight | Line height | Tracking | Text transform
--- | --- | --- | --- | --- | --- | ---
Subheading | RobotoMB | 24px | 400 | 15px | normal | none
Body | SourceSansPro-Regular | 15px | 400 | 18px | normal | none
Small text | SourceSansPro-Regular | 12px | 400 | 18px | normal | none
Label | SourceSansPro-Regular | 16px | 400 | 16px | normal | capitalize
Button | RobotoLR | 12px | 400 | 12px | normal | none
Heading | Jakarta-Medium | 14px | 400 | 21px | normal | none
Section heading | RobotoLR | 18px | 400 | 18px | normal | none

## Spacing

Value | Occurrences
--- | ---
2px | 24
3px | 12
4px | 6
5px | 67
6px | 94
7px | 30
8px | 10
10px | 55
11px | 1
13px | 3
15px | 85
16px | 12
17px | 2
19px | 12
20px | 15
23px | 1
24px | 4
32px | 3
40px | 2
192.5px | 2

## Layout gaps

No values observed in this sample.

## Corner radii

Value | Occurrences
--- | ---
3px | 16
5px | 12
6px | 4
12px | 6
28px | 4
50% | 8

## Shadows

No values observed in this sample.

## Motion durations

Value | Occurrences
--- | ---
0.4s | 1
0.3s | 1

## Motion easing

Value | Occurrences
--- | ---
ease | 1
ease-out | 1

### Accessible keyframe names

- fb_transform
- rotateSpinner

## Component recipes

Computed styles for the captured state. Selectors identify sampled elements; text and placeholders come from the page. Form values are excluded. These style specimens do not reconstruct child markup or uncaptured interaction states.

### Button 1

Observed text or placeholder: Select location

```css
#geoLocation {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  border-bottom-color: rgb(87, 87, 87);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(87, 87, 87);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 0px;
  border-right-color: rgb(212, 212, 212);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(87, 87, 87);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(87, 87, 87);
  display: list-item;
  font-family: RobotoLR;
  font-size: 12px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 12px;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgba(0, 0, 0, 0) | url("https://cdn.fcglcdn.com/brainbees/images/n/main-bg.jpg") | 1
2 | rgb(255, 255, 255) | none | 1

### Input 1

Observed text or placeholder: Search

```css
#search_box {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgb(255, 255, 255);
  background-image: none;
  border-bottom-color: rgb(255, 255, 255);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: rgb(255, 255, 255);
  border-left-style: solid;
  border-left-width: 1px;
  border-radius: 5px;
  border-right-color: rgb(255, 255, 255);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(255, 255, 255);
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: none;
  color: rgb(103, 103, 103);
  display: inline-block;
  font-family: RobotoLR;
  font-size: 13px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 30px;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 20px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgba(0, 0, 0, 0) | url("https://cdn.fcglcdn.com/brainbees/images/n/main-bg.jpg") | 1
2 | rgb(255, 255, 255) | none | 1
3 | rgb(255, 255, 255) | none | 1

### Input 2

```css
input {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgb(111, 195, 65);
  background-image: none;
  border-bottom-color: rgb(255, 255, 255);
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-left-color: rgb(255, 255, 255);
  border-left-style: none;
  border-left-width: 0px;
  border-radius: 3px;
  border-right-color: rgb(255, 255, 255);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(255, 255, 255);
  border-top-style: none;
  border-top-width: 0px;
  box-shadow: none;
  color: rgb(255, 255, 255);
  display: inline-block;
  font-family: RobotoLR, Arial, sans-serif;
  font-size: 10px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: normal;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgba(0, 0, 0, 0) | url("https://cdn.fcglcdn.com/brainbees/images/n/main-bg.jpg") | 1
2 | rgb(217, 243, 244) | none | 1
3 | rgb(217, 243, 244) | none | 1
4 | rgb(255, 255, 255) | none | 1

### Input 3

Observed text or placeholder: Enter Pin Code

```css
#tatpin {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgb(61, 61, 61);
  background-image: none;
  border-bottom-color: rgb(45, 45, 45);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: rgb(45, 45, 45);
  border-left-style: solid;
  border-left-width: 1px;
  border-radius: 3px;
  border-right-color: rgb(45, 45, 45);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(45, 45, 45);
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: none;
  color: rgb(189, 189, 189);
  display: inline-block;
  font-family: RobotoLR;
  font-size: 12px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: normal;
  opacity: 1;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 0px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgba(0, 0, 0, 0) | url("https://cdn.firstcry.com/brainbees/images/Premium-Boutique-pattern.jpg") | 1
2 | rgb(55, 55, 55) | none | 1
3 | rgb(55, 55, 55) | none | 1

### Input 4

Observed text or placeholder: Enter Pincode

```css
input.J14M_42.ip_box {
  align-items: normal;
  backdrop-filter: none;
  background-color: rgb(255, 255, 255);
  background-image: none;
  border-bottom-color: rgb(224, 224, 224);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: rgb(224, 224, 224);
  border-left-style: solid;
  border-left-width: 1px;
  border-radius: 6px;
  border-right-color: rgb(224, 224, 224);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(224, 224, 224);
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: none;
  color: rgb(66, 66, 66);
  display: inline-block;
  font-family: Jakarta-Medium;
  font-size: 14px;
  font-weight: 400;
  gap: normal;
  justify-content: normal;
  letter-spacing: normal;
  line-height: 21px;
  opacity: 1;
  padding-bottom: 5px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 5px;
  text-transform: none;
}
```

Ancestor backgrounds (outermost first):

Layer | Background color | Background image | Opacity
--- | --- | --- | ---
1 | rgba(0, 0, 0, 0) | url("https://cdn.fcglcdn.com/brainbees/images/n/main-bg.jpg") | 1
2 | rgb(255, 255, 255) | none | 1
3 | rgb(255, 255, 255) | none | 1

## Layout measurements

Element | Width | Display | Columns | Gap | Padding (T R B L)
--- | --- | --- | --- | --- | ---
section | 1012px | block | none | normal | 0px 0px 10px 0px
section | 1012px | flex | none | normal | 0px 0px 26px 0px
section | 506px | block | none | normal | 0px 0px 0px 0px
section | 506px | flex | none | normal | 0px 0px 0px 0px
section | 483px | block | none | normal | 20px 0px 20px 0px

## Responsive conditions

- `screen and (-ms-high-contrast:active)`
- `screen and (preferes-contrast:more)`
- `screen and (prefers-contrast: more)`

## Capture coverage

- 21 stylesheet(s) could not be inspected. Computed styles are still measured.
- Sampling excludes hidden elements and Sitepeel tools. Offscreen rendered elements may be included. Counts refer to the sample, not the entire website.
- Colors are CSS values, not a screenshot pixel palette. Images, compositing and gradients can affect their visible appearance.
- Hover, focus, active states, other viewport sizes, iframe documents and shadow trees need separate captures.
- No inferred brand personality, invented colors, placeholder copy or unobserved code is presented as a page measurement.
