# dd-autocollapse

Element query alternative that detects when a containing element becomes narrower than its children

## Table of Contents

- [Purpose](#purpose)
- [What It Does](#what-it-does)
- [Installation](#installation)
- [Examples](#examples)
    - [Single Instance](#single-instance)
    - [Multiple Named Instances](#multiple-named-instances)
    - [Alternate Container Element](#alternate-container-element)
- [API reference](#api-reference)
- [MIT License](#mit-license)

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

The directive first looks for any child element that has the `dd-ac-child` attribute on it. It then measures the total width of all of those elements. It compares that total to the width of the root element the directive was called on, and sets a class of `dd-ac-element-true` to the it if the container is too narrow to accommodate all the specified children. Or, if the container is wide enough, a class of `dd-ac-element-false` is set. Classes of `dd-ac-true` and `dd-ac-false` are also set on the root HTML element, to allow styling of elements outside the parent autocollapse element.

If you want the directive to test the total children width against an element besides the one the directive is called on, you can use the `dd-ac-container` attribute on the element you'd like to use instead (as long as it is also a child of the root element).

The directive will run once when the page is ready, and again whenever the window is resized.

#### Multiple Instances
The parent element also accepts and attribute of `dd-ac-name="[name of this autocollapse element]"`, which you can use if you have multiple autocollapse instances on the same page but want to apply different styles to each element. This will, in addition to the `dd-ac-element-true` and `dd-ac-element-false` classes, set the classes of `dd-ac-[instance name]-element-true` and `dd-ac-[instance name]-element-false` to the parent autocollapse element, and set a class of either `dd-ac-[instance name]-true` or `dd-ac-[instance name]-false` on the root HTML element (there will be a separate instance name class for each autocollapse instance).

##Installation

Either clone the repo, or install via Bower:

```
bower install (--save|--save-dev) dd-autocollapse
```

Once it's installed, link the file in your html:

```html
<script src="/bower_components/dd-autocollapse/dd-autocollapse.js"></script>
```

... and then specify the module as a dependency in your Angular module(s):

```
angular.module('myApp', [ 'dd-autocollapse' ]);
```

Now the directive will be available to use anywhere in that module.

##Examples

####Single instance

Write this:

```html
<header class="page-header" dd-autocollapse>
  <a class="logo" dd-ac-child>Bring Me Food!</a>
  <nav dd-ac-child>
    <a href="home">Home</a>
    <a href="home">Restaurants</a>
    <a href="home">Contact Us</a>
  </nav>
</header>
```

...and get this:

```html
<html class="dd-ac-false">
.
.
.
  <header class="page-header dd-ac-element-false" dd-autocollapse>
    <a class="logo" dd-ac-child>Bring Me Food!</a>
    <nav dd-ac-child>
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

...or this, if root element is narrower than the sum width of all its labeled children:

```html
<html class="dd-ac-true">
.
.
.
  <header class="page-header dd-ac-element-true" dd-autocollapse>
    <a class="logo" dd-ac-child>Bring Me Food!</a>
    <nav dd-ac-child>
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
<header class="page-header" dd-autocollapse dd-ac-name="header">
  <a class="logo" dd-ac-child>Bring Me Food!</a>
  <nav dd-ac-child>
    <a href="home">Home</a>
    <a href="home">Restaurants</a>
    <a href="home">Contact Us</a>
  </nav>
</header>
.
.
.
<section class="sidebar" dd-autocollapse dd-ac-name="sidebar">
  <h3 class="sidebar-title" dd-ac-child>Example Sidebar</h3>
  <p class="sidebar-subtitle" dd-ac-child>Sidebar subtitle</p>
</section>
```

...and get this:

```html
<html class="dd-ac-false dd-ac-header-false dd-ac-sidebar-false">
.
.
.
  <header class="page-header dd-ac-element-false dd-ac-header-element-false" dd-autocollapse dd-ac-name="header">
    <a class="logo" dd-ac-child>Bring Me Food!</a>
    <nav dd-ac-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
  .
  .
  .
  <section class="sidebar dd-ac-element-false dd-ac-sidebar-element-false" dd-autocollapse dd-ac-name="sidebar">
    <h3 class="sidebar-title" dd-ac-child>Example Sidebar</h3>
    <p class="sidebar-subtitle" dd-ac-child>Sidebar subtitle</p>
  </section>
.
.
.
</html>
```

...or this, if `dd-ac-container` is narrower than the sum width of all its labeled children (for both instances on the page):

```html
<html class="dd-ac-false dd-ac-header-true dd-ac-sidebar-true">
.
.
.
  <header class="page-header dd-ac-element-true dd-ac-header-element-true" dd-autocollapse dd-ac-name="header">
    <a class="logo" dd-ac-child>Bring Me Food!</a>
    <nav dd-ac-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </header>
  .
  .
  .
  <section class="sidebar dd-ac-element-true dd-ac-sidebar-element-true" dd-autocollapse dd-ac-name="sidebar">
    <h3 class="sidebar-title" dd-ac-child>Example Sidebar</h3>
    <p class="sidebar-subtitle"dd-ac-child>Sidebar subtitle</p>
  </section>
.
.
.
</html>
```

####Alternate "container" element

Sometimes, your CSS can cause the width of the root element to be calculated incorrectly, or outright ignored (e.g. when one or more child elements is positioned absolutely). You can optionally specify an alternate element for the directive to test the child widths sum against, by setting the `dd-ac-container` attribute on it.

```html
<header class="page-header" dd-autocollapse dd-ac-name="header">
  <div class="container" dd-ac-container>
    <a class="logo" style="position: absolute; top: 0; left: 20px" dd-ac-child >Bring Me Food!</a>
    <nav dd-ac-child>
      <a href="home">Home</a>
      <a href="home">Restaurants</a>
      <a href="home">Contact Us</a>
    </nav>
  </div>
</header>
```

##API Reference

| Attribute                  | Description                          | Required?    |
| -------------------------- | ------------------------------------ | ------------ |
| `dd-autocollapse`          | initialize the directive, and mark this as the root element | yes |
| `dd-ac-child`              | set this on all elements whose widths you want to be added to the total breakpoint width | yes |
| `dd-ac-name="[instance name]"` | optionally give the root element a name, to apply individual styling to just that element (as opposed to all instances of dd-autocollapse) | no |
| `dd-ac-container`          | if you don't want to use the root element's width as the container width, set this attribute on another element that you would like to use   | no |
| `dd-ac-offset="[number]"`    | if you'd like the breakpoint to occur at a higher or lower width value than is being calculated, you can use this attribute to set an arbitrary value that will adjust the breakpoint value | no |

##MIT License

The MIT License (MIT)

Copyright (c) 2015 DataDreamers, LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.