// testing result
export type TestResult = {
  spec: string
  message?: string
}

// testing result array
export type TestResults = {
  goodResults: Array<TestResult>
  wrongResults: Array<TestResult>
}

// testing result per scenario
export type StoryTestResults = Record<string, TestResults>
