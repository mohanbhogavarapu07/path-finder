
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#1D63FF',
					dark: '#2563EB',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#28C76F',
					dark: '#22C55E',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#FFCE32',
					dark: '#FEE440',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// FactorBeam Color Palette
				factorbeam: {
					bg: '#FFFFFF',
					'bg-alt': '#F5F6FA',
					primary: '#1D63FF',
					'primary-alt': '#2563EB',
					green: '#28C76F',
					'green-alt': '#22C55E',
					yellow: '#FFCE32',
					'yellow-alt': '#FEE440',
					heading: '#18213A',
					'heading-alt': '#232B35',
					text: '#44494D',
					'text-alt': '#3C4251'
				},
				// Legacy compatibility
				'factorbeam-green': {
					light: '#28C76F',
					DEFAULT: '#1D63FF',
					dark: '#2563EB'
				},
				'factorbeam-yellow': {
					light: '#FFCE32',
					DEFAULT: '#28C76F',
					dark: '#22C55E'
				},
				'factorbeam-gray': {
					light: '#F5F6FA',
					DEFAULT: '#44494D',
					dark: '#18213A'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				poppins: ['Poppins', 'system-ui', 'sans-serif'],
				inter: ['Inter', 'system-ui', 'sans-serif']
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				'gradient-hero': 'linear-gradient(to right, #1D63FF, #28C76F)',
				'gradient-card': 'linear-gradient(135deg, #1D63FF 0%, #28C76F 100%)',
				'gradient-cta': 'linear-gradient(90deg, #1D63FF 0%, #28C76F 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
