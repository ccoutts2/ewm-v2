// Placeholder project content until the client supplies real projects and photography.
// Every image under /images/placeholder/ is generated and labelled with what the final shot should show.

export type Image = {
	src: string;
	alt: string;
	width: number;
	height: number;
};

export type SpecRow = {
	label: string;
	value: string;
	/** Letter shown as a pin on the photograph and the drawing, linking it to this row. */
	key?: string;
};

export type Pin = {
	key: string;
	/** Position on the image, as a percentage of its width and height. */
	x: number;
	y: number;
};

export type GalleryItem =
	| { kind: 'wide'; image: Image; caption: string; pins?: Pin[] }
	| { kind: 'pair'; images: [Image, Image]; captions: [string, string] }
	| { kind: 'drawing'; image: Image; caption: string };

export type Project = {
	slug: string;
	title: string;
	location: string;
	year: number;
	designer: string;
	summary: string;
	body: string[];
	scope: string[];
	cover: Image;
	detailHero: Image;
	carousel: Image;
	spec: SpecRow[];
	gallery: GalleryItem[];
};

const placeholder = (name: string, alt: string, width: number, height: number): Image => ({
	src: `/images/placeholder/${name}.jpg`,
	alt,
	width,
	height
});

const dressingRoomPhoto: Image = {
	src: '/images/ewm/dressing-room.jpg',
	alt: 'Walk-in dressing room in walnut veneer with lit hanging rails and glass-topped jewellery drawers',
	width: 2400,
	height: 1599
};

export const projects: Project[] = [
	{
		slug: 'kensington-dressing-room',
		title: 'Dressing room, Kensington',
		location: 'Kensington, London',
		year: 2026,
		designer: 'Hollis & Reed Interiors',
		summary:
			'A walnut dressing room with integrated lighting and lined jewellery drawers, drawn, made and fitted in eight weeks.',
		body: [
			'The brief was a dressing room that felt like furniture rather than storage. Hollis & Reed set the palette; we developed it into manufacturing drawings, matched the veneer across every drawer front and built the run in three bays so it could be carried up a listed staircase.',
			'Lighting is recessed into the shelf edges and wired back to a single driver behind the central bay, so nothing shows when the doors are open. The jewellery drawers are lined in velvet cut to the client’s collection.',
			'Everything was made in our Thamesmead workshop, sprayed in our own booth and fitted by the same team in four days.'
		],
		scope: ['Manufacturing design', 'Bespoke joinery', 'Spraying', 'Installation'],
		cover: placeholder(
			'cover-dressing-room',
			'Placeholder for a close-up of grain-matched walnut drawer fronts',
			1200,
			1500
		),
		detailHero: placeholder(
			'dressing-room-detail-hero',
			'Placeholder for a macro shot of walnut grain running across three drawers',
			2400,
			1030
		),
		carousel: dressingRoomPhoto,
		spec: [
			{ label: 'Designer', value: 'Hollis & Reed Interiors' },
			{ label: 'Veneer', value: 'Crown-cut American walnut, book-matched', key: 'A' },
			{ label: 'Finish', value: 'Sprayed matt lacquer, 10% sheen' },
			{ label: 'Lighting', value: 'Recessed LED profile, 3000K', key: 'B' },
			{ label: 'Hardware', value: 'Häfele soft-close runners, push-to-open' },
			{ label: 'Lining', value: 'Kvadrat velvet, charcoal' },
			{ label: 'Programme', value: 'Eight weeks, four days on site' }
		],
		gallery: [
			{
				kind: 'wide',
				image: dressingRoomPhoto,
				caption: 'Three bays, built to be carried up a listed staircase.',
				pins: [
					{ key: 'A', x: 72, y: 66 },
					{ key: 'B', x: 57, y: 27 }
				]
			},
			{
				kind: 'pair',
				images: [
					placeholder(
						'dressing-room-detail-led',
						'Placeholder for an LED profile recessed into a shelf edge',
						1200,
						1500
					),
					placeholder(
						'dressing-room-detail-tray',
						'Placeholder for a velvet-lined jewellery tray',
						1200,
						1500
					)
				],
				captions: [
					'LED profile set into the shelf edge, wired to one hidden driver.',
					'Jewellery trays lined in velvet, divided to the client’s pieces.'
				]
			},
			{
				kind: 'drawing',
				image: {
					src: '/images/placeholder/dressing-room-drawing.jpg',
					alt: 'Placeholder shop drawing: elevation A of the three-bay dressing room, 3600 by 2400, with callouts A and B',
					width: 2400,
					height: 1600
				},
				caption: 'Elevation A, from our manufacturing drawings.'
			},
			{
				kind: 'wide',
				image: placeholder(
					'dressing-room-workshop',
					'Placeholder for carcasses in the workshop before spraying',
					2400,
					1600
				),
				caption: 'Carcasses in the Thamesmead workshop, before spraying.'
			}
		]
	},
	{
		slug: 'hampstead-kitchen',
		title: 'Kitchen, Hampstead',
		location: 'Hampstead, London',
		year: 2025,
		designer: 'Studio Anwen',
		summary:
			'A painted kitchen and pantry with honed stone worktops and a hand-finished oak island.',
		body: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet.',
			'Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.'
		],
		scope: ['Bespoke joinery', 'Spraying', 'Installation'],
		cover: placeholder(
			'cover-kitchen',
			'Placeholder for a stone worktop meeting a painted door',
			1200,
			1500
		),
		detailHero: placeholder(
			'kitchen-detail-hero',
			'Placeholder for a macro shot of a honed stone edge profile',
			2400,
			1030
		),
		carousel: placeholder(
			'hero-kitchen',
			'Placeholder for a full-room kitchen photograph',
			2400,
			1350
		),
		spec: [
			{ label: 'Designer', value: 'Studio Anwen' },
			{ label: 'Doors', value: 'Tulipwood, in-frame, sprayed' },
			{ label: 'Colour', value: 'Farrow & Ball Railings No. 31' },
			{ label: 'Island', value: 'Rift-sawn oak, Osmo Polyx matt' }
		],
		gallery: []
	},
	{
		slug: 'marylebone-banquette',
		title: 'Banquette, Marylebone',
		location: 'Marylebone, London',
		year: 2025,
		designer: 'Parr Studio',
		summary: 'A curved, fluted banquette and dining joinery for a private members’ dining room.',
		body: [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.',
			'Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo.'
		],
		scope: ['Upholstery', 'Bespoke joinery', 'Installation'],
		cover: placeholder(
			'cover-banquette',
			'Placeholder for fluted upholstery and piping',
			1200,
			1500
		),
		detailHero: placeholder(
			'banquette-detail-hero',
			'Placeholder for a macro shot of a fluted back at 60mm pitch',
			2400,
			1030
		),
		carousel: placeholder('hero-banquette', 'Placeholder for an upholstered banquette', 2400, 1350),
		spec: [
			{ label: 'Designer', value: 'Parr Studio' },
			{ label: 'Fabric', value: 'Camira wool, moss' },
			{ label: 'Fluting', value: '60mm pitch, hand-piped' },
			{ label: 'Frame', value: 'Beech, sprung seat' }
		],
		gallery: []
	}
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);

export const nextProject = (slug: string) => {
	const index = projects.findIndex((project) => project.slug === slug);
	return projects[(index + 1) % projects.length];
};
