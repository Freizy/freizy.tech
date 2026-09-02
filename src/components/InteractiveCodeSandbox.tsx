import React, { useState } from 'react';
import {
  Code,
  Play,
  RotateCw,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
} from 'lucide-react';

export const InteractiveCodeSandbox: React.FC = () => {
  const [activeLang, setActiveLang] = useState<'ts' | 'py' | 'rust' | 'curl'>('ts');
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ts: `import { FreizyEnterpriseSDK } from '@freizy/ai-core';

// Initialize zero-retention neural cluster client
const freizy = new FreizyEnterpriseSDK({
  apiKey: process.env.FREIZY_API_KEY,
  region: 'us-east-matrix',
  deterministicLatency: true,
});

// Run real-time edge inference with private vectors
const response = await freizy.inference.execute({
  model: 'freizy-neuralcore-70b-fp8',
  prompt: 'Generate predictive supply-chain telemetry anomaly score',
  parameters: {
    maxTokens: 512,
    temperature: 0.1,
  },
});

console.log(\`Latency: \${response.latencyMs}ms | Result: \${response.output}\`);`,

    py: `from freizy import FreizyClient, ClusterModel

# Connect to Freizy GPU Cluster with hardware acceleration
client = FreizyClient(api_key="frz_live_sec_token", region="auto")

result = client.neural.generate(
    model=ClusterModel.NEURAL_70B_FP8,
    prompt="Synthesize multi-modal sensor telemetry for robotic nodes",
    max_latency_ms=2,
    stream=True
)

for chunk in result:
    print(chunk.token, end="", flush=True)`,

    rust: `use freizy_engine::{FreizyClient, ClusterConfig, Precision};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = FreizyClient::new(ClusterConfig {
        endpoint: "https://api.freizytech.com".into(),
        precision: Precision::FP8,
        nvlink_direct: true,
    })?;

    let telemetry = client.stream_optical_mesh().await?;
    println!("Zero-loss routing active. Backbone latency: {:?}", telemetry.latency);
    Ok(())
}`,

    curl: `curl -X POST https://api.freizytech.com/v1/neural/infer \\
  -H "Authorization: Bearer frz_live_enterprise_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "freizy-neural-70b-fp8",
    "cluster": "matrix-x-rack04",
    "workload": "vision_and_predictive_erp",
    "max_latency_ms": 2
  }'`,
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setExecutionOutput(null);

    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput(JSON.stringify(
        {
          status: 'SUCCESS_200_OK',
          cluster_node: 'FREIZY-MATRIX-X-04-US-EAST',
          inference_time_ms: 1.18,
          memory_bandwidth_used: '3.35 TB/s',
          tokens_generated: 412,
          confidence_rating: 0.9994,
          network_packet_loss: '0.0000%',
          audit_hash: '0x8fbc49281aef9841cda789b91',
        },
        null,
        2
      ));
    }, 650);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 relative bg-slate-50 dark:bg-[#08090d] border-t border-slate-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-neutral-900 border border-red-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-widest text-[#E5252A] mb-3 font-semibold">
            <Terminal className="w-3.5 h-3.5" />
            <span>DEVELOPER EXPERIENCE & SDK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            Engineered for <span className="text-brand-gradient">Developer Velocity</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-400 text-base sm:text-lg transition-colors">
            Clean TypeScript, Python, Rust, and REST APIs. Integrate neural inference and enterprise microservices with less than ten lines of code.
          </p>
        </div>

        {/* Code Editor Box */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 dark:bg-neutral-950 border border-slate-800 dark:border-neutral-800 shadow-2xl overflow-hidden text-neutral-100">
          {/* Editor Header */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-900 dark:bg-neutral-900/90 border-b border-slate-800 dark:border-neutral-800 gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              {(['ts', 'py', 'rust', 'curl'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setActiveLang(lang);
                    setExecutionOutput(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                    activeLang === lang
                      ? 'bg-[#E5252A] text-white font-bold'
                      : 'text-neutral-400 hover:text-white bg-slate-800/60 dark:bg-neutral-800/40 hover:bg-slate-800'
                  }`}
                >
                  {lang === 'ts'
                    ? 'TypeScript'
                    : lang === 'py'
                    ? 'Python'
                    : lang === 'rust'
                    ? 'Rust'
                    : 'cURL / REST'}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-300 hover:text-white border border-slate-700 dark:border-neutral-700 transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-lg bg-[#E5252A] hover:bg-[#d01e23] text-white font-mono text-xs font-semibold shadow-md shadow-[#E5252A]/20 transition-all flex items-center gap-1.5"
              >
                {isRunning ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run API Call</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 font-mono text-xs overflow-x-auto bg-[#0a0c10]">
            <pre className="text-neutral-300 leading-relaxed">
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>

          {/* Simulated Terminal Output Console */}
          {executionOutput && (
            <div className="p-5 bg-[#050608] border-t border-slate-800 dark:border-neutral-800 font-mono text-xs animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-neutral-900 mb-3">
                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  RESPONSE PAYLOAD (Status: 200 OK)
                </span>
                <span className="text-[11px] text-neutral-500">Latency: 1.18ms</span>
              </div>
              <pre className="text-emerald-300/90 text-[11px] overflow-x-auto">
                <code>{executionOutput}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
