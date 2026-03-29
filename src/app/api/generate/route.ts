import { NextRequest, NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const DEMO_MODE = !GROQ_API_KEY || GROQ_API_KEY === 'demo_mode';

function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, 1000);
}

function generateDemoResponse(task: string) {
  const lowerTask = task.toLowerCase();
  
  let code = '';
  let saas_cost = 20;
  let our_cost = '0.001';
  let logic_explanation = '';

  if (lowerTask.includes('csv') || lowerTask.includes('json')) {
    code = `import pandas as pd
import json

def convert_csv_to_json(csv_file, output_file):
    """Convert CSV to JSON using AI-powered data inference"""
    df = pd.read_csv(csv_file)
    
    # AI can infer optimal JSON structure
    data = df.to_dict(orient='records')
    
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    
    return f"Converted {len(data)} records"

# Usage
convert_csv_to_json('input.csv', 'output.json')`;
    saas_cost = 15;
    logic_explanation = 'CSV-to-JSON tools charge $15/month for a task that takes 5 lines of Python. Run this script locally or on GitHub Actions for free.';
  } else if (lowerTask.includes('email') || lowerTask.includes('slack')) {
    code = `import requests
import os

def send_to_slack(message, channel="#general"):
    """Send a message to Slack via webhook"""
    webhook_url = os.environ.get("SLACK_WEBHOOK_URL")
    
    response = requests.post(webhook_url, json={
        "channel": channel,
        "text": message,
        "username": "AI Bot"
    })
    
    return response.status_code == 200

# Usage
send_to_slack("Task completed successfully!")`;
    saas_cost = 30;
    logic_explanation = 'Zapier charges $30/month for Slack integrations. This 10-line script does the same thing for free.';
  } else {
    code = `// Your custom AI automation script
const task = "${task.replace(/"/g, '\\"')}";

async function automate() {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${process.env.GROQ_API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: task }],
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

automate();`;
    logic_explanation = 'Instead of paying $20/month for an AI assistant subscription, use this script to call the API directly. You only pay for tokens used.';
  }

  return { code, saas_cost, our_cost, logic_explanation };
}

async function callGroqAPI(task: string, apiKey: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const prompt = `You are a code generation assistant that creates simple, efficient scripts.

Task: ${task}

Please respond with a JSON object in the following format:
{
  "code": "The complete, single-file code that solves the task (use JavaScript or Python as appropriate).",
  "saas_cost": 20,
  "our_cost": "0.001",
  "logic_explanation": "One sentence explaining why this solution is cheaper than using a SaaS."
}

Rules:
- code must be a complete, working script
- saas_cost should be a reasonable monthly estimate (e.g., 15-30 USD)
- our_cost should be a small amount, typically less than $0.01, show as a string with 3 decimal places
- logic_explanation should be concise and clear
- Always return valid JSON, no markdown formatting`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 2048,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Groq API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { task } = body;

    if (!task || typeof task !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Task is required' },
        { status: 400 }
      );
    }

    const sanitizedTask = sanitizeInput(task);

    if (sanitizedTask.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Task cannot be empty' },
        { status: 400 }
      );
    }

    let result;

    if (DEMO_MODE) {
      result = generateDemoResponse(sanitizedTask);
    } else {
      result = await callGroqAPI(sanitizedTask, GROQ_API_KEY!);
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}
