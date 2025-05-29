// app/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface TestConfig {
  temperature: number;
  max_tokens: number;
  presence_penalty: number;
  frequency_penalty: number;
  stop: string[];
}

export default function Home() {
  const [systemPrompt, setSystemPrompt] = useState('');
  const [userPrompt, setUserPrompt] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState<TestConfig[]>([
    { temperature: 0.0, max_tokens: 50, presence_penalty: 0.0, frequency_penalty: 0.0, stop: [] },
    { temperature: 0.7, max_tokens: 150, presence_penalty: 1.5, frequency_penalty: 0.0, stop: [] }
  ]);

  const updateConfig = (index: number, field: keyof TestConfig, value: any) => {
    const newConfigs = [...configs];
    newConfigs[index] = { ...newConfigs[index], [field]: value };
    setConfigs(newConfigs);
  };

  const addConfig = () => {
    setConfigs([...configs, { temperature: 0.7, max_tokens: 150, presence_penalty: 0.0, frequency_penalty: 0.0, stop: [] }]);
  };

  const removeConfig = (index: number) => {
    setConfigs(configs.filter((_, i) => i !== index));
  };

  const addStopSequence = (index: number) => {
    const newConfigs = [...configs];
    newConfigs[index].stop = [...newConfigs[index].stop, ''];
    setConfigs(newConfigs);
  };

  const removeStopSequence = (configIndex: number, stopIndex: number) => {
    const newConfigs = [...configs];
    newConfigs[configIndex].stop = newConfigs[configIndex].stop.filter((_, i) => i !== stopIndex);
    setConfigs(newConfigs);
  };

  const updateStopSequence = (configIndex: number, stopIndex: number, value: string) => {
    const newConfigs = [...configs];
    newConfigs[configIndex].stop[stopIndex] = value;
    setConfigs(newConfigs);
  };

  const runPlayground = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/generate', {
        systemPrompt,
        userPrompt,
        model,
        testConfigs: configs,
      });
      setResults(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧪 Interactive Prompt Playground</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">System Prompt</label>
            <textarea
              placeholder="Enter system prompt..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">User Prompt</label>
            <textarea
              placeholder="Enter user prompt..."
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-3 bg-gray-800 rounded-md border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Test Configurations</h2>
            <Button onClick={addConfig} variant="outline">Add Configuration</Button>
          </div>

          <div className="space-y-6">
            {configs.map((config, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Configuration {index + 1}</h3>
                  <Button onClick={() => removeConfig(index)} variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Temperature: {config.temperature}</label>
                    <Slider
                      value={[config.temperature]}
                      onValueChange={([value]) => updateConfig(index, 'temperature', value)}
                      min={0}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Max Tokens: {config.max_tokens}</label>
                    <Slider
                      value={[config.max_tokens]}
                      onValueChange={([value]) => updateConfig(index, 'max_tokens', value)}
                      min={50}
                      max={300}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Presence Penalty: {config.presence_penalty}</label>
                    <Slider
                      value={[config.presence_penalty]}
                      onValueChange={([value]) => updateConfig(index, 'presence_penalty', value)}
                      min={-2}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Frequency Penalty: {config.frequency_penalty}</label>
                    <Slider
                      value={[config.frequency_penalty]}
                      onValueChange={([value]) => updateConfig(index, 'frequency_penalty', value)}
                      min={-2}
                      max={2}
                      step={0.1}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm">Stop Sequences</label>
                      <Button onClick={() => addStopSequence(index)} variant="outline" size="sm">
                        Add Stop Sequence
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {config.stop.map((stop, stopIndex) => (
                        <div key={stopIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={stop}
                            onChange={(e) => updateStopSequence(index, stopIndex, e.target.value)}
                            placeholder="Enter stop sequence..."
                            className="flex-1 p-2 bg-gray-700 rounded-md border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          />
                          <Button
                            onClick={() => removeStopSequence(index, stopIndex)}
                            variant="destructive"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={runPlayground}
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run Playground'}
        </Button>

        <div className="mt-8 space-y-4">
          {results.map((r, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-sm text-gray-400 mb-2">
                Temp: {r.temperature} | Tokens: {r.max_tokens} | Pres Pen: {r.presence_penalty} | Freq Pen: {r.frequency_penalty}
                {r.stop && r.stop.length > 0 && ` | Stop: ${r.stop.join(', ')}`}
              </div>
              <pre className="whitespace-pre-wrap text-sm">{r.output}</pre>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
