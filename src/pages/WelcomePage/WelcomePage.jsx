import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomePage() {
  return (
    <>
    <div>Hi, welcome to downbeat!</div>
    <p>Your go-to spot for spur-of-the-moment beats, and custom practice rhtyhms!</p>
    <Link to="/projects/new">Create a new project!</Link>
    </>
  )
}
