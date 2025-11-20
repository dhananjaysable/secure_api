'use client';

import { useAuth } from '../lib/auth-context';
import { apiClient } from '../lib/api-client';
import { useState } from 'react';
import Link from 'next/link';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function Home() {
  const { user, logout, isAuthenticated } = useAuth();
  const [weather, setWeather] = useState<WeatherForecast[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiClient.get<WeatherForecast[]>('/WeatherForecast');
      setWeather(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data. Are you logged in?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Secure API Demo
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.firstName}</span>
              <button
                onClick={logout}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="relative flex place-items-center flex-col gap-8">
        <h1 className="text-4xl font-bold">Weather Forecast (Protected)</h1>

        {isAuthenticated && (
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="rounded bg-green-500 px-6 py-3 text-white hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch Secure Data'}
          </button>
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded border border-red-300">
            {error}
          </div>
        )}

        {weather.length > 0 && (
          <div className="grid grid-cols-1 gap-4 w-full max-w-2xl">
            {weather.map((item, index) => (
              <div key={index} className="p-4 border rounded shadow bg-white dark:bg-zinc-800">
                <p className="font-bold">{item.date}</p>
                <p>Temp: {item.temperatureC}°C / {item.temperatureF}°F</p>
                <p>Summary: {item.summary}</p>
              </div>
            ))}
          </div>
        )}

        {!isAuthenticated && (
          <div className="p-6 bg-yellow-100 text-yellow-800 rounded border border-yellow-300 max-w-md text-center">
            <p>You must be logged in to view the weather forecast.</p>
            <p className="mt-2 text-sm">The API endpoint is protected with [Authorize] and requires a valid JWT token.</p>
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
      </div>
    </main>
  );
}