import React from "react";

export default function Theme() {

    // Root element
    let rootElement = document.documentElement;

    // Light Theme
    let lightTheme = {
        "--back": "#ffffff",
        "--text": "#000000",
        "--main": "rgba(255, 255, 255, 0.8)",
        "--border": "rgba(0, 0, 0, 0.2)",
        "--primary": "#eceff1",
        "--input-focus": "#f2f2f2",
        "--button-hover": "#f2f2f2",
        "--button-click": "#e0e0e0",
        "--sent-message": "#8be9b9",
        "--text-message": "#000000",
        "--loading": "#8be9b9"
    }

    // Dark Theme
    let darkTheme = {
        "--back": "#212121",
        "--text": "#9E9E9E",
        "--main": "rgba(0, 0, 0, 0.9)",
        "--border": "rgba(255, 255, 255, 0.1)",
        "--primary": "#000000",
        "--input-focus": "#263238",
        "--button-hover": "#263238",
        "--button-click": "#1f282c",
        "--sent-message": "#263238",
        "--text-message": "#9E9E9E",
        "--loading": "#8be9b9"
    }

    // Default color
    let defaultColor = {
        "--back": "#ffffff",
        "--text": "#000000",
        "--main": "rgba(255, 255, 255, 0.8)",
        "--border": "rgba(0, 0, 0, 0.2)",
        "--primary": "#eceff1",
        "--input-focus": "#f2f2f2",
        "--button-hover": "#f2f2f2",
        "--button-click": "#e0e0e0",
        "--sent-message": "#8be9b9",
        "--text-message": "#000000",
        "--loading": "#8be9b9"
    };

    // Gold color
    let goldColor = {
        "--back": "#ffffff",
        "--text": "#000000",
        "--main": "rgba(255, 255, 255, 0.8)",
        "--border": "rgba(0, 0, 0, 0.2)",
        "--primary": "#fece2f",
        "--input-focus": "#fff6d7",
        "--button-hover": "#fff6d7",
        "--button-click": "#ffe695",
        "--sent-message": "#ffcc80",
        "--text-message": "#000000",
        "--loading": "#fece2f"
    };

    // Nature color
    let natureColor = {
        "--back": "#ffffff",
        "--text": "#000000",
        "--main": "rgba(255, 255, 255, 0.8)",
        "--border": "rgba(0, 0, 0, 0.2)",
        "--primary": "#46a094",
        "--input-focus": "#c4e8c2",
        "--button-hover": "#c4e8c2",
        "--button-click": "#aecfa4",
        "--sent-message": "#6bbd99",
        "--text-message": "#000000",
        "--loading": "#46a094"
    };

    // Sky color
    let skyColor = {
        "--back": "#ffffff",
        "--text": "#000000",
        "--main": "rgba(255, 255, 255, 0.8)",
        "--border": "rgba(0, 0, 0, 0.2)",
        "--primary": "#3b7197",
        "--input-focus": "#a1e1fa",
        "--button-hover": "#a1e1fa",
        "--button-click": "#74bde0",
        "--sent-message": "#4a8db7",
        "--text-message": "#ffffff",
        "--loading": "#3b7197"
    };

    // Tutti i nomi dei temi
    let light = 'light';
    let dark = 'dark';
    let def = 'default';
    let gold = 'gold';
    let nature = 'nature';
    let sky = 'sky';

    // Metodo per cambiare il tema
    const setColorTheme = (color, name) => {
        localStorage.setItem('theme', name);
        Object.keys(color).forEach(function (key) {
            rootElement.style.setProperty(key, color[key]);
        });
    };

    return (
        <>
            <div id="theme-container">
                <p>Scegli tema</p>
                <div className="colors-container">
                    <div
                        className="theme-color"
                        id="light-theme"
                        onClick={() => setColorTheme(lightTheme, light)}
                    ></div>
                    <div
                        className="theme-color"
                        id="dark-theme"
                        onClick={() => setColorTheme(darkTheme, dark)}
                    ></div>
                </div>
                <p>Scegli colore</p>
                <div className="colors-container">
                    <div
                        className="theme-color"
                        id="default-color"
                        onClick={() => setColorTheme(defaultColor, def)}
                    ></div>
                    <div
                        className="theme-color"
                        id="gold-color"
                        onClick={() => setColorTheme(goldColor, gold)}
                    ></div>
                    <div
                        className="theme-color"
                        id="nature-color"
                        onClick={() => setColorTheme(natureColor, nature)}
                    ></div>
                    <div
                        className="theme-color"
                        id="sky-color"
                        onClick={() => setColorTheme(skyColor, sky)}
                    ></div>
                </div>
            </div>
        </>
    )
}