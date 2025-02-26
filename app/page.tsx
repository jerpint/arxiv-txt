import { Highlight, themes } from "prism-react-renderer";
import Layout from '@/app/components/Layout';

export default function Home() {
  const pythonCode = `import requests

arxiv_url = "https://arxiv.org/abs/1706.03762"
arxiv_txt_url = arxiv_url.replace("arxiv.org", "arxiv-txt.org/raw/")
summary: str = requests.get(arxiv_txt_url).text
print(summary)

# Pass this to your favorite agent`;

  const bashCode = `# Save the raw text to a file
curl -o paper.txt https://arxiv-txt.org/raw/abs/1706.03762

# or pipe directly to CLI apps:
# This example uses the 'llm' library
# https://github.com/simonw/llm

curl -L https://arxiv-txt.org/raw/abs/1706.03762 | \\
llm -s "Explain this paper like I'm 5"
`;


  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">
        arXiv-txt.org
      </h1>
      <p className="text-lg opacity-90 mb-8">
        LLM-friendly arXiv papers | <a href="https://github.com/jerpint/arxiv-txt" className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
          GitHub
          <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </p>

      <div className="card bg-base-100 w-full max-w-2xl shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">How It Works</h2>
          <p className="mb-6">
            Replace <code className="badge badge-ghost">arxiv.org</code> to
            <code className="badge badge-ghost ml-2">arxiv-txt.org</code>
          </p>

          <div className="bg-base-200 p-4 rounded-lg">
            {/* <div className="text-sm opacity-75 mb-2">Original URL:</div> */}
            {/* <a href="https://arxiv.org/abs/1706.03762" className="link link-primary block mb-4"> */}
              {/* https://arxiv.org/abs/1706.03762 */}
            {/* </a> */}

            <div className="text-sm opacity-75 mb-2">Try it out:</div>
            <div className="p-3 bg-base-300 rounded-lg">
              <a href="/abs/1706.03762" className="link link-primary block">
                https://arxiv-txt.org/abs/1706.03762
              </a>
              {/* <span className="text-sm opacity-75">Gets full paper content</span> */}
            </div>
          </div>

          {/* <p className="mt-4">For raw text API access, see API usage guide below.</p> */}
        </div>
      </div>

      {/* <div className="w-full max-w-2xl mt-10">
        <h2 className="text-2xl font-bold mb-6">Try Some Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/abs/1706.03762"
            className="btn btn-primary"
          >
            arxiv-txt.org/
            <br />
            abs/1706.03762
          </a>
          <a
            href="/abs/2402.17764"
            className="btn btn-primary"
          >
            arxiv-txt.org/
            <br />
            abs/2402.17764
          </a>
          <a
            href="/abs/2501.12948"
            className="btn btn-primary"
          >
            arxiv-txt.org/
            <br />
            abs/2501.12948
          </a>
        </div>
      </div> */}

      <div className="card bg-base-100 w-full max-w-2xl shadow-xl my-16">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4 text-center">
            API Usage Guide
          </h1>

          <div className="space-y-4">
            <p className="text-center mb-6">
              arXiv-txt is designed to be API-friendly
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="mb-2">Fetch a text summary:</p>
                <div className="bg-base-200 p-4 rounded-lg">
                  <code className="badge badge-ghost p-3 w-full flex justify-center">arxiv-txt.org/raw/abs/[id]</code>
                </div>
              </div>

              <div>
                <p className="mb-2">Fetch the full paper content:</p>
                <div className="bg-base-200 p-4 rounded-lg">
                  <code className="badge badge-ghost p-3 w-full flex justify-center">arxiv-txt.org/raw/pdf/[id]</code>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm opacity-75 mb-2">Try it out:</div>
              <div className="p-4 bg-base-300 rounded-lg hover:bg-base-200 transition-colors">
                <a href="https://arxiv-txt.org/raw/abs/1706.03762" className="link link-primary block text-center">
                  https://arxiv-txt.org/raw/abs/1706.03762
                </a>
              </div>
            </div>
          </div>

          <div className="divider my-8"></div>

          <div className="mb-8">
            <h3 id="python" className="text-xl font-semibold mb-4">Python</h3>
            <p className="mb-4"> Checkout this example <a href="https://github.com/jerpint/arxiv-txt/blob/main/examples/python/lit_review.ipynb" target="_blank" rel="noopener noreferrer" className="link link-primary">Jupyter Notebook</a> or use the arxiv-txt API directly </p>

            <div className="mockup-code relative overflow-x-auto rounded-lg shadow-md">
              <Highlight theme={themes.gruvboxMaterialDark} code={pythonCode} language="python">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} p-6 whitespace-pre`} style={{...style, lineHeight: 1.5}}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="pl-4">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>

          <div>
            <h3 id="cli" className="text-xl font-semibold mb-4">Command Line</h3>
            <div className="mockup-code relative overflow-x-auto rounded-lg shadow-md">
              <Highlight theme={themes.gruvboxMaterialDark} code={bashCode} language="python">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} p-6 whitespace-pre`} style={{...style, lineHeight: 1.5}}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    <Layout></Layout>
    </div>
  );
}