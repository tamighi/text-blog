import React from "react";

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return (
    "#" +
    [r, g, b]
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};

const hexToHue = (hex: string) => {
  const cleaned = hex.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;

  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return h;
};

export type ColorPickerProps = {
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
};

const ColorPicker = ({
  value = "#23F259",
  onChange,
  disabled = false,
}: ColorPickerProps) => {
  const [hexInput, setHexInput] = React.useState(value);
  const [displayColor, setDisplayColor] = React.useState(value);
  const [hue, setHue] = React.useState(hexToHue(value) ?? (0 as number));

  React.useEffect(() => {
    onChange?.(value);
  }, []);

  React.useEffect(() => {
    setHexInput(value);
    setDisplayColor(value);
    setHue(hexToHue(value) as number);
  }, [value]);

  const handleHueChange = (value: number) => {
    onChange?.(hslToHex(value, 100, 50));
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    const h = hexToHue(value);
    if (h) {
      onChange?.(value);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <input
          value={hexInput}
          onChange={(e) => handleHexChange(e.target.value)}
          className="input w-full"
          disabled={disabled}
        />
        <div
          className="aspect-square rounded-lg h-10"
          style={{ backgroundColor: displayColor }}
        />
      </div>
      <input
        type="range"
        disabled={disabled}
        min={0}
        max={360}
        value={hue}
        onChange={(e) => handleHueChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none"
        style={{
          background:
            "linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)",
          filter: disabled ? "brightness(0.5)" : "none",
          cursor: disabled ? "default" : "pointer",
        }}
      />
    </div>
  );
};

export default ColorPicker;
