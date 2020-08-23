/** @jsx jsx */
import { FC } from 'react'
import { jsx, CSSObject } from '@storybook/theming'
import { TestResults } from 'src/types'

interface Props {
  results: TestResults
}

export const Specifications: FC<Props> = ({ results }) => (
  <ul css={wrapper}>
    {results.wrongResults.map((r, idx) => (
      <li css={[error, li]} key={idx}>
        <p>{r.spec}</p>
        <p css={message}>{r.message}</p>
      </li>
    ))}

    {results.goodResults.map((r, idx) => (
      <li css={[pass, li]} key={idx}>
        <p>{r}</p>
      </li>
    ))}
  </ul>
)

const wrapper: CSSObject = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  fontFamily:
    '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
  fontSize: 12,
  letterSpacing: 1,
  textDecoration: 'none',
  listStyleType: 'none',
  border: '1px solid transparent',
}

const error: CSSObject = {
  ':before': {
    content: "'✘'",
    padding: '3px 5px',
    backgroundColor: 'red',
  },
}

const li: CSSObject = {
  ':before': {
    marginRight: '5px',
    marginTop: '11px',
    fontSize: '70%',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '12px',
    float: 'left',
  },
}

const message: CSSObject = {
  padding: '10px',
  margin: '10px',
}

const pass: CSSObject = {
  ':before': {
    content: "'✔'",
    padding: '4px 5px',
    backgroundColor: 'green',
  },
}
