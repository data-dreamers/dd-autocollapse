# dd-autocollapse
Element query that detects when a containing element becomes narrower than its children

## Table of Contents

- [Purpose](#purpose)
- [What It Does](#what-it-does)
- [Installation](#installation)

## Purpose

At DataDreamers, one of the biggest parts of our restaurant delivery service platform is our customers' public-facing websites. One of the major problems we ran into while building the latest iteration of front-facing templates was how to allow any given theme to have reliaible responsive behavior with dynamic content.

For example, imagine you want to apply a set of styles to your header when the viewport gets too narrow to show the company logo and navigation inline horizontally. This is traditionally done with media queries, or more recently, with [element queries](https://github.com/tysonmatanich/elementQuery).

So, when you compare this header layout:

![example of 'overlay' header option](/../screenshots/screenshots/header-overlay.png?raw=true "example of 'overlay' header option")

...to this header layout:

![example of 'inline' header option](/../screenshots/screenshots/header-inline.png?raw=true "example of 'overlay' header option")

...you would need to set a different breakpoint width for each instance. Now, it might be relatively straightforward to set a different breakpoint for each of the two layout styles (I mean c'mon, there's only two!). But what if a thrid layout option were added later on? That approach just won't scale. And even if it did, you still can't control for the user's content - in this case, the business name - which then renders the layout-option problem moot. You have to somehow accommodate dynamic content.

That is where dd-autocollapse comes in.

##What It Does

*(oh no, your princess is in another castle!)*

## Installation

```
bower install (--save|--save-dev) dd-autocollapse
```
