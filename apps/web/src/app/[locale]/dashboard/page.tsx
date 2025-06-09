'use client'

import { useRouter } from 'next/navigation'
import { Callout } from '@/components/callout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { DocsSidebarNav } from '@/components/docs/sidebar-nav'
import { Button } from '@/components/ui/button'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const popularItems = [
	{
		title: { en: 'Popular Model 1', fr: 'Modèle Populaire 1' },
		description: {
			en: 'A brief description of Popular Model 1',
			fr: 'Une brève description du Modèle Populaire 1',
		},
		href: '/models/popular-model-1',
		items: [],
	},
	{
		title: { en: 'Popular Model 2', fr: 'Modèle Populaire 2' },
		description: {
			en: 'A brief description of Popular Model 2',
			fr: 'Une brève description du Modèle Populaire 2',
		},
		href: '/models/popular-model-2',
		items: [],
	},
	{
		title: { en: 'Popular Market 1', fr: 'Marché Populaire 1' },
		description: {
			en: 'A brief description of Popular Market 1',
			fr: 'Une brève description du Marché Populaire 1',
		},
		href: '/markets/popular-market-1',
		items: [],
	},
	{
		title: { en: 'Popular Market 2', fr: 'Marché Populaire 2' },
		description: {
			en: 'A brief description of Popular Market 2',
			fr: 'Une brève description du Marché Populaire 2',
		},
		href: '/markets/popular-market-2',
		items: [],
	},
]

export default function NewPage() {
	const router = useRouter()
	const [selectedMarket, setSelectedMarket] = useState('')
	const [availableMarkets, setAvailableMarkets] = useState([])

	useEffect(() => {
		async function fetchMarkets() {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}market`)
				if (!response.ok) {
					throw new Error('Failed to fetch available markets')
				}
				const data = await response.json()
				setAvailableMarkets(data.available_markets)
			} catch (error) {
				console.error('Error fetching available markets:', error)
			}
		}

		fetchMarkets()
	}, [])

	const handleMarketSelection = (marketAbbreviation: string) => {
		setSelectedMarket(marketAbbreviation)
		router.push(`/dashboard/${marketAbbreviation}`)
	}

	const handleViewAllModels = () => {
		router.push('/models')
	}

	return (
		<main className="container mx-auto py-8">
			<Callout title="Welcome to the Dashboard" icon="📊" dashboard>
				<p>
					Select your market to explore predictions or view all available models
					and their statistics.
				</p>
			</Callout>
			<div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-8">
				<div className="mt-8 col-span-1 md:col-span-4 max-w-4xl">
					<label
						htmlFor="market-select"
						className="block text-lg font-medium mb-2"
					>
						Select the market:
					</label>
					<select
						id="market-select"
						className="w-full px-4 py-2 border rounded-md"
						onChange={(e) => handleMarketSelection(e.target.value)}
					>
						<option value="" disabled selected>
							Choose a market
						</option>
						{availableMarkets.map((market) => (
							<option key={market} value={market}>
								{market}
							</option>
						))}
					</select>

					<p className="mt-4 text-center text-gray-600">Or</p>

					<Button className="mt-4 w-full" onClick={handleViewAllModels}>
						View All Models Available
					</Button>

					<Button
						className="mt-4 w-full"
						onClick={() => router.push('/dashboard/markets')}
					>
						View Market Details
					</Button>
				</div>

				<aside className="col-span-1 md:col-span-1 max-w-xs border-l pl-4">
					<DocsSidebarNav items={popularItems} locale="en" />
				</aside>
			</div>
		</main>
	)
}
