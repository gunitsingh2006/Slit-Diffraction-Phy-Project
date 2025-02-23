import React, { useState, useEffect } from "react";
import {
  Ruler,
  Lightbulb,
  Maximize2,
  ArrowRight,
  Move3D,
  Moon,
  Sun,
  Calculator,
} from "lucide-react";

function App() {
  const [wavelength, setWavelength] = useState(500); // nm
  const [slitWidth, setSlitWidth] = useState(0.1); // mm
  const [distance, setDistance] = useState(1000); // mm
  const [intensity, setIntensity] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  // Calculate diffraction pattern
  useEffect(() => {
    const calculateIntensity = () => {
      const points = 200; // Increased for smoother visualization
      const maxAngle = 0.1; // radians
      const intensities = [];

      for (let i = 0; i < points; i++) {
        const theta = (maxAngle * (i - points / 2)) / (points / 2);
        const alpha =
          (Math.PI * slitWidth * Math.sin(theta)) / (wavelength * 1e-6);
        const I = alpha === 0 ? 1 : Math.pow(Math.sin(alpha) / alpha, 2);
        intensities.push(I);
      }
      setIntensity(intensities);
    };

    calculateIntensity();
  }, [wavelength, slitWidth]);

  // Calculate position of first minimum
  const firstMinimum = (wavelength * distance) / (slitWidth * 1000);

  // Convert wavelength to approximate RGB color
  const wavelengthToColor = (wl: number) => {
    if (wl >= 380 && wl < 440) return "rgb(138, 43, 226)";
    if (wl >= 440 && wl < 490) return "rgb(0, 0, 255)";
    if (wl >= 490 && wl < 510) return "rgb(0, 255, 0)";
    if (wl >= 510 && wl < 580) return "rgb(255, 255, 0)";
    if (wl >= 580 && wl < 645) return "rgb(255, 127, 0)";
    if (wl >= 645 && wl <= 750) return "rgb(255, 0, 0)";
    return "rgb(255, 255, 255)";
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <header
        className={`${darkMode ? "bg-blue-900" : "bg-blue-600"} text-white p-6`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Lightbulb className="w-8 h-8" />
            Single-Slit Diffraction Experiment For First Minimum
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode
                ? "bg-blue-800 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-400"
            } transition-colors`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-6">
       
        {/* Explanation */}
        <div
          className={`mt-8 mb-9 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-lg`}
        >
          <h1 className="text-3xl font-semibold mb-4">Wave Warriors</h1>
          <div className="prose max-w-none">
            <p className="text-xl">Single-Slit Diffraction Experiment For First Minimum is a physics simulation using FrameWork React in TypeScript/JavaScript, HTML, and CSS. It visualizes wave diffraction through slits with real-time calculations of interference patterns, intensity distribution, and wave behavior.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } p-4 rounded-lg`}
              >
                <h2 className="text-2xl font-semibold mb-2">Team Members </h2>
                <ul className="text-xl list-disc list-inside space-y-2">
                  <li>Gunit Singh Duggal </li>
                  <li>Divjot Singh Malhotra</li>
                  <li>Kirat Singh</li>
                  <li>Navraj Singh</li>
                  <li>Harman Singh</li>
                </ul>
              </div>
            </div>

            
          </div>{" "}
        </div>

        {/* Formula Box */}
        <div
          className={`mb-8 ${
            darkMode ? "bg-blue-900" : "bg-blue-100"
          } p-6 rounded-lg shadow-lg`}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            Single-Slit Diffraction Formula
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div
              className={`p-4 ${
                darkMode ? "bg-blue-800" : "bg-white"
              } rounded-lg shadow flex items-center justify-center w-full md:w-1/2`}
            >
              <div className="text-center">
                <p className="text-3xl mb-2">y = λL/a</p>
                <div className="text-xl opacity-80">
                  <p>where:</p>
                  <p>y = position of first minimum</p>
                  <p>λ = wavelength of light</p>
                  <p>L = distance to screen</p>
                  <p>a = slit width</p>
                </div>
              </div>
            </div>
            <div
              className={`p-4 ${
                darkMode ? "bg-blue-800" : "bg-white"
              } rounded-lg shadow w-full md:w-1/2`}
            >
              <h3 className="text-2xl font-semibold mb-2 text-center">
                Calculated Result
              </h3>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  ±{firstMinimum.toFixed(2)} mm
                </p>
                <p className="text-l opacity-80">
                  Distance from center to first minimum
                </p>
                <div className="mt-4 text-l grid grid-cols-2 gap-2">
                  <div
                    className={`p-2 ${
                      darkMode ? "bg-blue-900" : "bg-blue-50"
                    } rounded`}
                  >
                    <p>λ = {wavelength} nm</p>
                  </div>
                  <div
                    className={`p-2 ${
                      darkMode ? "bg-blue-900" : "bg-blue-50"
                    } rounded`}
                  >
                    <p>a = {slitWidth} mm</p>
                  </div>
                  <div
                    className={`p-2 ${
                      darkMode ? "bg-blue-900" : "bg-blue-50"
                    } rounded col-span-2`}
                  >
                    <p>L = {distance} mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experiment Schematic */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-lg mb-8`}
        >
          <h2 className="text-3xl font-semibold mb-4 flex items-center gap-2">
            <Move3D className="w-6 h-6" />
            Experiment Setup
          </h2>
          <div className="relative h-48 bg-black rounded-lg overflow-hidden">
            {/* Light Source */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-yellow-300 rounded-full animate-pulse shadow-lg shadow-yellow-200"></div>
              <div
                className="absolute left-8 top-1/2 w-32 h-1 -translate-y-1/2"
                style={{
                  background: `linear-gradient(90deg, ${wavelengthToColor(
                    wavelength
                  )}, transparent)`,
                }}
              ></div>
            </div>

            {/* Slit */}
            <div className="absolute left-48 top-0 bottom-0 w-1 bg-gray-700 flex justify-center items-center">
              <div
                className="bg-black"
                style={{ height: `${slitWidth * 200}px`, width: "4px" }}
              ></div>
            </div>

            {/* Screen */}
            <div className="absolute right-4 top-0 bottom-0 w-2 bg-gray-200 rounded"></div>

            {/* Light Path */}
            <div
              className="absolute left-48 top-1/2 -translate-y-1/2"
              style={{
                borderLeft: "100px solid transparent",
                borderRight: "100px solid transparent",
                borderTop: "100px solid rgba(255, 255, 255, 0.1)",
                transform: "rotate(90deg)",
              }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-lg`}
          >
            <h2 className="text-3xl font-semibold mb-4">
              Experiment Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  className={`block text-xl font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Wavelength of Light (nm)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="380"
                    max="750"
                    value={wavelength}
                    onChange={(e) => setWavelength(Number(e.target.value))}
                    className="w-full"
                  />
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: wavelengthToColor(wavelength) }}
                  ></div>
                </div>
                <span
                  className={`text-l ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {wavelength} nm
                </span>
              </div>

              <div>
                <label
                  className={`block text-l font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Slit Width (mm)
                </label>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.05"
                  value={slitWidth}
                  onChange={(e) => setSlitWidth(Number(e.target.value))}
                  className="w-full"
                />
                <span
                  className={`text-l ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {slitWidth} mm
                </span>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Distance to Screen (mm)
                </label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } p-6 rounded-lg shadow-lg`}
          >
            <h2 className="text-2xl font-semibold mb-4">Diffraction Pattern</h2>

            {/* Pattern Visualization */}
            <div className="relative h-48 bg-black rounded-lg overflow-hidden">
              {/* Central Maximum */}
              <div className="absolute inset-0 flex items-center">
                {intensity.map((i, index) => (
                  <div
                    key={index}
                    style={{
                      height: `${i * 100}%`,
                      width: `${100 / intensity.length}%`,
                      backgroundColor: `${wavelengthToColor(wavelength)}`,
                      opacity: i,
                    }}
                    className="transform origin-bottom"
                  />
                ))}
              </div>

              {/* Scale Markers */}
              <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-between px-4">
                <div className="w-px h-full bg-gray-500"></div>
                <div className="w-px h-full bg-gray-500"></div>
                <div className="w-px h-full bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div
          className={`mt-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-6 rounded-lg shadow-lg`}
        >
          <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
          <div className="prose max-w-none">
            <p>
              Single-slit diffraction occurs when light waves pass through a
              narrow aperture. The width of the slit affects how the light waves
              interact and create an interference pattern on the screen.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } p-4 rounded-lg`}
              >
                <h3 className="font-semibold text-2xl mb-2">Key Observations</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Smaller slit width = wider diffraction pattern</li>
                  <li>Larger wavelength = wider diffraction pattern</li>
                  <li>
                    The central maximum is twice as wide as the secondary maxima
                  </li>
                </ul>
              </div>
              <div
                className={`${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                } p-4 rounded-lg`}
              >
                <h3 className="font-semibold text-2xl mb-2">
                  Mathematical Description
                </h3>
                <p>Position of first minimum (y) = λL/a, where:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>λ = wavelength</li>
                  <li>L = distance to screen</li>
                  <li>a = slit width</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
