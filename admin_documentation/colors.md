# Color Theme

Upon starting the application for the first time, everything is styled in purple. This is to signal that the administrator should start immediately with the configuration for the color theme.

This can be done from the Admin Page -> Theme Page.

## Background Information

The [Material Design System](https://m3.material.io/styles/color/system/how-the-system-works) is implemented under the hood to generate the entire color palette from just a few input colors.

For example, choosing green: ![Green Color Palette](colors-media/algorithm.png)

## Page Structure

The page is divided into two parts: **Color Pickers** and **Color Previews**:
![Page Structure](colors-media/page.png)

Clicking on a color picker allows you to input your institution's color:

<div style="display: flex;">
    <img src="colors-media/input.png" style="width: 30%">
    <p style="display: flex; justify-content: center; align-items: center; width: 5%">
        or
    </p>
    <img src="colors-media/input2.png" style="width: 30%">
    <p style="display: flex; justify-content: center; align-items: center; width: 5%">
        or
    </p>
    <img src="colors-media/input3.png" style="width: 30%">
</div>

_Color picker depends on your browser, yours might look different. Most of them also have a button to toggle the Color Code type (RGB vs HEX vs CYMK)_

## Example Flow

Let's customize the page for TU Wien. The primary color of TU Wien is `#006699`, so if you input that into the **Primary Color Picker** you get this:
![TU Wien Theme](colors-media/tuwien1.png)

At this point, you might notice that the colors throughout the application do not 100% match the Primary Color you have used. This is because the [Material Design System](https://m3.material.io/styles/color/system/how-the-system-works) does not allow any color to be used as the primary color. If you need 100% compliance, check the **Exact Colors** checkbox:
![Exact Colors Checkbox](colors-media/checkbox.png)

Now, you can go and test your theme. You can leave the Admin Page and try creating a DMP. If you are happy with your theme, you can return to the Admin Page and click **Save**.

## Advanced Flow

The [Material Design System](https://m3.material.io/styles/color/system/how-the-system-works) allows for three input colors: primary, secondary and tertiary. The TU Wien theme was actually generated using both a Primary Color `#006699` and a Tertiary Color `#373737`. To input this additional color, you can enable the **Tertiary Color Picker**.
![Tertiary Color Picker](colors-media/tertiary.png)

For even more color pickers (which have a subtle effect on the application), you can enable the **Advanced** checkbox:
![Advanced Color Pickers](colors-media/advanced.png)

Again, make sure to save your theme if you are happy with it.
