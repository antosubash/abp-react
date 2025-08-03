import { redirect } from 'next/navigation'

/**
 * The Home component redirects to the Storybook introduction welcome page.
 *
 * @returns {void} Redirects to Storybook
 */
export default async function Home() {
  redirect('/?path=/story/introduction-welcome--welcome')
}
