import React, { useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SkipForward, Play } from "lucide-react";
import confetti from "canvas-confetti";
import { getInitialState, scrambledWordReducer } from "./scrambleWordReducer";

export const ScrambleWords = () => {
  const [state, dispatch] = useReducer(scrambledWordReducer, getInitialState());

  const {
    words,
    currentWord,
    errorCounter,
    guess,
    isGameOver,
    maxAllowErrors,
    maxSkips,
    points,
    scrambledWord,
    skipCounter,
    totalWords,
  } = state;

  useEffect(() => {
    if (points === 0) return;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [points]);

  const handleGuessSubmit = (e: React.FormEvent) => {
    // Previene el refresh de la página
    e.preventDefault();

    dispatch({ type: "CHECK_ANSWER" });
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP_WORD" });
  };

  const handlePlayAgain = () => {
    dispatch({ type: "START_NEW_GAME", payload: getInitialState() });
  };

  if (words.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Palabras desordenadas
          </h1>
          <p className="text-gray-300">No hay palabras para jugar</p>
          <br />
          <div className="text-cyan-400 font-semibold">Puntaje: {points}</div>
          <br />
          <div className="text-red-400 font-semibold">
            Errores: {errorCounter}
          </div>
          <br />
          <div className="text-yellow-400 font-semibold">
            Saltos: {skipCounter}
          </div>
          <br />
          <Button
            onClick={handlePlayAgain}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-400/40 border border-cyan-400/30"
          >
            Jugar de nuevo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
            Palabras desordenadas
          </h1>
          <p className="text-gray-300 text-lg">
            Desordena las letras para encontrar la palabra!
          </p>
        </div>

        {/* Main Game Card */}
        <Card className="backdrop-blur-lg bg-gray-800/90 border border-gray-700 shadow-2xl shadow-purple-500/20">
          <CardContent className="p-8">
            {/* Scrambled Word Display */}
            <div className="mb-8">
              <h2 className="text-center text-sm font-medium text-gray-400 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
                Palabra Desordenada
                {isGameOver && (
                  <span className="text-red-400 text-xl drop-shadow-lg">
                    {" "}
                    {currentWord}
                  </span>
                )}
              </h2>

              <div className="flex justify-center gap-2 mb-6">
                {scrambledWord.split("").map((letter, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/30 transform hover:scale-105 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-400/40 border border-cyan-400/30"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: "fadeInUp 0.6s ease-out forwards",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>

            {/* Guess Input */}
            <form onSubmit={handleGuessSubmit} className="mb-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="guess"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Adivina la palabra
                  </label>
                  <Input
                    id="guess"
                    type="text"
                    value={guess}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_GUESS",
                        payload: e.target.value,
                      })
                    }
                    placeholder="Ingresa tu palabra..."
                    className="text-center text-lg font-semibold h-12 bg-gray-700 border-2 border-gray-600 focus:border-cyan-400 focus:bg-gray-600 text-white placeholder-gray-400 transition-all duration-200 shadow-inner"
                    maxLength={scrambledWord.length}
                    disabled={isGameOver}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-400/40 transform hover:scale-[1.02] transition-all duration-200 border border-cyan-400/30"
                  disabled={!guess.trim() || isGameOver}
                >
                  Enviar Adivinanza
                </Button>
              </div>
            </form>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-emerald-900/50 to-green-800/50 rounded-lg p-4 text-center border border-emerald-500/30 shadow-lg shadow-emerald-500/20">
                <div className="text-2xl font-bold text-emerald-400">
                  {points} / {totalWords}
                </div>
                <div className="text-sm text-emerald-300 font-medium">
                  Puntos
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-900/50 to-rose-800/50 rounded-lg p-4 text-center border border-red-500/30 shadow-lg shadow-red-500/20">
                <div className="text-2xl font-bold text-red-400">
                  {errorCounter}/{maxAllowErrors}
                </div>
                <div className="text-sm text-red-300 font-medium">Errores</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-700 bg-gray-800 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                disabled={isGameOver || skipCounter >= maxSkips}
              >
                <SkipForward className="w-4 h-4" />
                Saltar ({skipCounter} / {maxSkips})
              </Button>
              <Button
                onClick={handlePlayAgain}
                variant="outline"
                className="border-2 border-purple-500 hover:border-purple-400 hover:bg-purple-900/50 bg-gray-800 text-purple-400 hover:text-purple-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Play className="w-4 h-4" />
                Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Desafíate con palabras desordenadas!
            <br />
            <br />
            <span className="text-cyan-400 font-medium">
              {words.join(", ")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
