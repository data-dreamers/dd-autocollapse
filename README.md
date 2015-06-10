# dd-autocollapse
Element query that detects when a containing element becomes narrower than its children

## Table of Contents

- [Purpose](#purpose)
- [What It Does](#what-it-does)
- [Examples](#examples)
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

`dd-autocollapse` first looks for the `dd-autocollapse-parent` attribute, and scopes all operations to that element on a per-instance basis. It then looks inside that element for any child element that has the `dd-autocollapse-child` attribute on it. It then measures the total width of all of those elements. It compares that total to a single element with the `dd-autocollapse-contaner` attribute set on it (which will most likely be the same element with `dd-autocollapse-parent` set on it), and sets a class of `dd-autocollapse-element-true` to the element if the container is too narrow to accommodate all the specified children, or a class of `dd-autocollapse-element-false` if the container is wide enough. Classes of `dd-autocollapse-true` and `dd-autocollapse-false` are also set on the root HTML element, to allow styling of elements outside the parent autocollapse element.

The directive will run once when the page is ready, and again whenever the window is resized.

#### Multiple Instances
The parent element also accepts and attribute of `dd-autocollapse-name="[name of this autocollapse element]"`, which you can use if you have multiple autocollapse instances on the same page but want to apply different styles to each element. This will, in addition to the `dd-autocollapse-element-true` and `dd-autocollapse-element-false` classes, set the classes of `dd-autocollapse-[instance name]-element-true` and `dd-autocollapse-[instance name]-element-false` to the parent autocollapse element, and set a class of either `dd-autocollapse-[instance name]-true` or `dd-autocollapse-[instance name]-false` on the root HTML element (there will be a separate instance name class for each autocollapse instance).

##Examples

####Single instance

Write this:

```html
<header class="page-header" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container>
  <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
  <nav dd-autocollapse-child>
    <a href="home">Home</a>
    <a href="home">Restaurants</a>
    <a href="home">Contact Us</a>
  </nav>
</header>
```

...and get this:

```html
<html class="dd-autocollapse-false">
.
.
.
  <header class="page-header dd-autocollapse-element-false" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container>
    <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
    <nav dd-autocollapse-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
.
.
.
</html>
```

...or this, if `dd-autocollapse-container` is narrower than the sum width of all its labeled children:

```html
<html class="dd-autocollapse-true">
.
.
.
  <header class="page-header dd-autocollapse-element-true" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container>
    <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
    <nav dd-autocollapse-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
.
.
.
</html>
```

####Multiple Named Instances

Write this:

```html
<header class="page-header" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="header">
  <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
  <nav dd-autocollapse-child>
    <a href="home">Home</a>
    <a href="home">Restaurants</a>
    <a href="home">Contact Us</a>
  </nav>
</header>
.
.
.
<section class="sidebar" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="sidebar">
  <h3 class="sidebar-title" dd-autocollapse-child>Example Sidebar</h3>
  <p class="sidebar-subtitle"dd-autocollapse-child>Sidebar subtitle</p>
</section>
```

...and get this:

```html
<html class="dd-autocollapse-false dd-autocollapse-header-false dd-autocollapse-sidebar-false">
.
.
.
  <header class="page-header dd-autocollapse-element-false dd-autocollapse-header-element-false" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="header">
    <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
    <nav dd-autocollapse-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
  .
  .
  .
  <section class="sidebar dd-autocollapse-element-false dd-autocollapse-sidebar-element-false" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="sidebar">
    <h3 class="sidebar-title" dd-autocollapse-child>Example Sidebar</h3>
    <p class="sidebar-subtitle"dd-autocollapse-child>Sidebar subtitle</p>
  </section>
.
.
.
</html>
```

...or this, if `dd-autocollapse-container` is narrower than the sum width of all its labeled children (for both instances on the page):

```html
<html class="dd-autocollapse-false dd-autocollapse-header-true dd-autocollapse-sidebar-true">
.
.
.
  <header class="page-header dd-autocollapse-element-true dd-autocollapse-header-element-true" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="header">
    <a class="logo" dd-autocollapse-child>Bring Me Food!</a>
    <nav dd-autocollapse-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
  .
  .
  .
  <section class="sidebar dd-autocollapse-element-true dd-autocollapse-sidebar-element-true" dd-autocollapse dd-autocollapse-parent dd-autocollapse-container dd-autocollapse-name="sidebar">
    <h3 class="sidebar-title" dd-autocollapse-child>Example Sidebar</h3>
    <p class="sidebar-subtitle"dd-autocollapse-child>Sidebar subtitle</p>
  </section>
.
.
.
</html>
```



##Installation

```
bower install (--save|--save-dev) dd-autocollapse
```
