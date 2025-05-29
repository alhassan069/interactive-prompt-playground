# Interactive Prompt Playground

A Next.js application for testing and comparing different LLM prompt configurations in real-time. This playground allows you to experiment with various parameters and see their effects on model outputs simultaneously.

## Features

- **Multiple Configuration Testing**: Run the same prompt with different parameter sets side by side
- **Parameter Controls**:
  - Temperature (0-2): Controls randomness in the output
  - Max Tokens (50-300): Limits the length of generated responses
  - Presence Penalty (-2 to 2): Adjusts how much to penalize new tokens based on their presence
  - Frequency Penalty (-2 to 2): Adjusts how much to penalize new tokens based on their frequency
  - Custom Stop Sequences: Add multiple stop sequences to control where the model stops generating
- **Model Selection**: Choose between GPT-3.5 Turbo and GPT-4
- **Prompt Management**:
  - System Prompt: Set the base behavior and context for the model
  - User Prompt: Define the specific input to test
- **Real-time Results**: View and compare outputs from different configurations instantly

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```
2. Add the api key in your environment or add it in .env file
   ```bash
   export OPENAI_API_KEY=your_key
   ``` 
   

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your system prompt to set the base behavior for the model
2. Enter your user prompt to test
3. Select your desired model (GPT-3.5 Turbo or GPT-4)
4. Configure one or more test configurations with different parameters
5. Click "Run Playground" to see the results
6. Compare outputs from different configurations to find the optimal settings

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

