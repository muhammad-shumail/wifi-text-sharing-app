import React from 'react'
import TextShareClient from '../components/TextShare'

type Props = {}

const page = (props: Props) => {
  return (
    <TextShareClient initialSharedTexts={[]} />
  )
}

export default page