// This is a sample database of demolition materials for commercial construction

export const commercialMaterialDatabase = [
  // Bituminous paving
  {
    id: "comm-bituminous-paving-3",
    name: 'Bituminous paving, depths to 3"',
    category: "Bituminous paving",
    unit: "SF",
    manhourUnit: 0.03,
  },
  {
    id: "comm-bituminous-paving-loader",
    name: "Large area with a wheel loader",
    category: "Bituminous paving",
    unit: "SY",
    manhourUnit: 0.048,
  },
  {
    id: "comm-bituminous-paving-strips",
    name: 'Strips 24" wide for utility lines',
    category: "Bituminous paving",
    unit: "SY",
    manhourUnit: 0.055,
  },
  {
    id: "comm-bituminous-paving-small",
    name: "Add for jobs under 50 SY",
    category: "Bituminous paving",
    unit: "SY",
    manhourUnit: 0.013,
  },
  {
    id: "comm-bituminous-curbs",
    name: 'Bituminous curbs to 12" width',
    category: "Bituminous paving",
    unit: "LF",
    manhourUnit: 0.035,
  },

  // Concrete sidewalk or paving
  {
    id: "comm-concrete-sidewalk",
    name: "Concrete sidewalk or paving",
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-concrete-sidewalk-4-no-reinf",
    name: '4" concrete with no reinforcing',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.045,
  },
  {
    id: "comm-concrete-sidewalk-4-mesh",
    name: '4" concrete with mesh but no rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-concrete-sidewalk-4-rebars",
    name: '4" concrete with rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.058,
  },
  {
    id: "comm-concrete-sidewalk-5-mesh",
    name: '5" concrete with mesh but no rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.063,
  },
  {
    id: "comm-concrete-sidewalk-5-rebars",
    name: '5" concrete with rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.073,
  },
  {
    id: "comm-concrete-sidewalk-6-mesh",
    name: '6" concrete with mesh and no rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.078,
  },
  {
    id: "comm-concrete-sidewalk-6-rebars",
    name: '6" concrete with rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.089,
  },
  {
    id: "comm-concrete-sidewalk-8-mesh",
    name: '8" concrete with mesh but no rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.109,
  },
  {
    id: "comm-concrete-sidewalk-8-rebars",
    name: '8" concrete with rebars',
    category: "Concrete sidewalk or paving",
    unit: "SF",
    manhourUnit: 0.126,
  },

  // Concrete over 8" to 12"
  {
    id: "comm-concrete-8-12",
    name: 'Concrete over 8" to 12"',
    category: 'Concrete over 8" to 12"',
    unit: "SF",
    manhourUnit: 0.15,
  },
  {
    id: "comm-concrete-8-12-cy-no-rebars",
    name: "Per CY without rebars",
    category: 'Concrete over 8" to 12"',
    unit: "CY",
    manhourUnit: 4.6,
  },
  {
    id: "comm-concrete-8-12-cy-rebars",
    name: "Per CY with rebars",
    category: 'Concrete over 8" to 12"',
    unit: "CY",
    manhourUnit: 5.29,
  },

  // Concrete curb
  {
    id: "comm-concrete-curb",
    name: "Concrete curb",
    category: "Concrete curb",
    unit: "LF",
    manhourUnit: 0.25,
  },
  {
    id: "comm-concrete-curb-gutter",
    name: 'Curb and 24" monolithic gutter',
    category: "Concrete curb",
    unit: "LF",
    manhourUnit: 0.1,
  },
  {
    id: "comm-concrete-curb-planter",
    name: 'Planter and batter type curbs 6" wide',
    category: "Concrete curb",
    unit: "LF",
    manhourUnit: 0.043,
  },

  // Remove pavement markings
  {
    id: "comm-remove-pavement-markings",
    name: "Remove pavement markings",
    category: "Pavement markings",
    unit: "LF",
    manhourUnit: 0.02,
  },
  {
    id: "comm-pavement-markings-4",
    name: '4" wide strips',
    category: "Pavement markings",
    unit: "LF",
    manhourUnit: 0.032,
  },
  {
    id: "comm-pavement-markings-sf",
    name: "Per square foot",
    category: "Pavement markings",
    unit: "SF",
    manhourUnit: 0.098,
  },

  // Remove chain link fence
  {
    id: "comm-remove-chain-link-fence",
    name: "Remove chain link fence",
    category: "Chain link fence",
    unit: "LF",
    manhourUnit: 0.08,
  },
  {
    id: "comm-chain-link-fence-4",
    name: "Chain link fence up to 4' high",
    category: "Chain link fence",
    unit: "LF",
    manhourUnit: 0.03,
  },
  {
    id: "comm-chain-link-fence-5-8",
    name: "Chain link fence 5' to 8' high",
    category: "Chain link fence",
    unit: "LF",
    manhourUnit: 0.055,
  },
  {
    id: "comm-chain-link-fence-salvage",
    name: "Remove and salvage chain link fence to 8' high",
    category: "Chain link fence",
    unit: "LF",
    manhourUnit: 0.073,
  },

  // Remove and dispose of wood fence
  {
    id: "comm-remove-wood-fence",
    name: "Remove and dispose of wood fence",
    category: "Wood fence",
    unit: "LF",
    manhourUnit: 0.06,
  },
  {
    id: "comm-wood-fence-picket-4",
    name: "Picket or board fence to 4' high",
    category: "Wood fence",
    unit: "LF",
    manhourUnit: 0.056,
  },
  {
    id: "comm-wood-fence-picket-5-8",
    name: "Picket or board fence to 5' to 8' high",
    category: "Wood fence",
    unit: "LF",
    manhourUnit: 0.08,
  },
  {
    id: "comm-wood-fence-split-rail",
    name: "Split rail fence 2 or 3 rail",
    category: "Wood fence",
    unit: "LF",
    manhourUnit: 0.035,
  },
  {
    id: "comm-wood-fence-gate",
    name: "Remove wood or chain link fence gate including one gate post",
    category: "Wood fence",
    unit: "LF",
    manhourUnit: 0.333,
  },

  // Highway-type guardrail
  {
    id: "comm-highway-guardrail",
    name: "Highway-type guardrail",
    category: "Highway-type guardrail",
    unit: "LF",
    manhourUnit: 0.12,
  },
  {
    id: "comm-highway-guardrail-dispose",
    name: "Remove and dispose guardrail",
    category: "Highway-type guardrail",
    unit: "LF",
    manhourUnit: 0.043,
  },
  {
    id: "comm-highway-guardrail-salvage",
    name: "Remove guardrail in salvage condition",
    category: "Highway-type guardrail",
    unit: "LF",
    manhourUnit: 0.074,
  },
  {
    id: "comm-highway-guardrail-posts",
    name: "Remove and dispose guardrail posts",
    category: "Highway-type guardrail",
    unit: "EA",
    manhourUnit: 0.245,
  },

  // Manholes and catch basins
  {
    id: "comm-manholes-catch-basins",
    name: "Manholes and catch basins",
    category: "Manholes and catch basins",
    unit: "EA",
    manhourUnit: 4.0,
  },
  {
    id: "comm-manholes-catch-basins-brick",
    name: "Brick",
    category: "Manholes and catch basins",
    unit: "EA",
    manhourUnit: 5.16,
  },
  {
    id: "comm-manholes-catch-basins-masonry",
    name: "Masonry",
    category: "Manholes and catch basins",
    unit: "EA",
    manhourUnit: 5.33,
  },
  {
    id: "comm-manholes-catch-basins-precast",
    name: "Precast concrete",
    category: "Manholes and catch basins",
    unit: "EA",
    manhourUnit: 6.64,
  },
  {
    id: "comm-manholes-catch-basins-sand",
    name: "Add for sand fill",
    category: "Manholes and catch basins",
    unit: "CY",
    manhourUnit: 0.125,
  },

  // Frame and cover from manhole or catch basin
  {
    id: "comm-frame-cover-manhole",
    name: "Frame and cover from manhole or catch basin",
    category: "Frame and cover from manhole or catch basin",
    unit: "EA",
    manhourUnit: 1.5,
  },
  {
    id: "comm-frame-cover-manhole-salvage",
    name: "Remove in salvage condition",
    category: "Frame and cover from manhole or catch basin",
    unit: "EA",
    manhourUnit: 1.45,
  },
  {
    id: "comm-frame-cover-manhole-reset",
    name: "Remove and reset",
    category: "Frame and cover from manhole or catch basin",
    unit: "EA",
    manhourUnit: 3.99,
  },

  // Fire Hydrant
  {
    id: "comm-fire-hydrant",
    name: "Fire Hydrant",
    category: "Fire Hydrant",
    unit: "EA",
    manhourUnit: 3.0,
  },
  {
    id: "comm-fire-hydrant-dispose",
    name: "Remove and dispose",
    category: "Fire Hydrant",
    unit: "EA",
    manhourUnit: 5.57,
  },

  // Sewer pipe
  {
    id: "comm-sewer-pipe",
    name: "Sewer pipe",
    category: "Sewer pipe",
    unit: "LF",
    manhourUnit: 0.2,
  },
  {
    id: "comm-sewer-pipe-12",
    name: 'Up to 12" diameter',
    category: "Sewer pipe",
    unit: "LF",
    manhourUnit: 0.114,
  },
  {
    id: "comm-sewer-pipe-15-18",
    name: '15" to 18"',
    category: "Sewer pipe",
    unit: "LF",
    manhourUnit: 0.134,
  },
  {
    id: "comm-sewer-pipe-21-24",
    name: '21" to 24"',
    category: "Sewer pipe",
    unit: "LF",
    manhourUnit: 0.154,
  },
  {
    id: "comm-sewer-pipe-27-36",
    name: '27" to 36"',
    category: "Sewer pipe",
    unit: "LF",
    manhourUnit: 0.202,
  },

  // Welded steel pipe
  {
    id: "comm-welded-steel-pipe",
    name: "Welded steel pipe",
    category: "Welded steel pipe",
    unit: "LF",
    manhourUnit: 0.3,
  },
  {
    id: "comm-welded-steel-pipe-4",
    name: '4" diameter or smaller',
    category: "Welded steel pipe",
    unit: "LF",
    manhourUnit: 0.111,
  },
  {
    id: "comm-welded-steel-pipe-6-10",
    name: '6" to 10" diameter',
    category: "Welded steel pipe",
    unit: "LF",
    manhourUnit: 0.202,
  },

  // Underground liquid storage tanks
  {
    id: "comm-underground-storage-tanks",
    name: "Underground liquid storage tanks",
    category: "Underground liquid storage tanks",
    unit: "EA",
    manhourUnit: 16.0,
  },
  {
    id: "comm-underground-storage-tanks-50-250",
    name: "50 to 250 gallon tank",
    category: "Underground liquid storage tanks",
    unit: "EA",
    manhourUnit: 4.24,
  },
  {
    id: "comm-underground-storage-tanks-250-600",
    name: "Over 250 to 600 gallon tank",
    category: "Underground liquid storage tanks",
    unit: "EA",
    manhourUnit: 11.7,
  },
  {
    id: "comm-underground-storage-tanks-600-1000",
    name: "Over 600 to 1,000 gallon tank",
    category: "Underground liquid storage tanks",
    unit: "EA",
    manhourUnit: 22.4,
  },
  {
    id: "comm-underground-storage-tanks-sand",
    name: "Add for sand fill",
    category: "Underground liquid storage tanks",
    unit: "CY",
    manhourUnit: 0.125,
  },

  // Railroad demolition
  {
    id: "comm-railroad-demolition",
    name: "Railroad demolition",
    category: "Railroad demolition",
    unit: "LF",
    manhourUnit: 0.5,
  },
  {
    id: "comm-railroad-demolition-track",
    name: "Remove track and ties for scrap",
    category: "Railroad demolition",
    unit: "LF",
    manhourUnit: 0.508,
  },
  {
    id: "comm-railroad-demolition-ballast",
    name: "Remove and dispose of ballast stone",
    category: "Railroad demolition",
    unit: "CY",
    manhourUnit: 0.111,
  },
  {
    id: "comm-railroad-demolition-ties",
    name: "Remove wood ties alone",
    category: "Railroad demolition",
    unit: "EA",
    manhourUnit: 0.143,
  },

  // Light standards and flagpoles up to 30'
  {
    id: "comm-light-standards-flagpoles",
    name: "Light standards and flagpoles up to 30'",
    category: "Light standards and flagpoles",
    unit: "EA",
    manhourUnit: 2.5,
  },
  {
    id: "comm-light-standards-flagpoles-salvage",
    name: "Remove item in salvage condition",
    category: "Light standards and flagpoles up to 30'",
    unit: "EA",
    manhourUnit: 6.24,
  },
  {
    id: "comm-light-standards-flagpoles-no-salvage",
    name: "Remove item no savage",
    category: "Light standards and flagpoles up to 30'",
    unit: "EA",
    manhourUnit: 0.746,
  },

  // Torch cutting steel plates
  {
    id: "comm-torch-cutting-steel",
    name: "Torch cutting steel plates",
    category: "Torch cutting steel plates",
    unit: "LF",
    manhourUnit: 0.15,
  },
  {
    id: "comm-torch-cutting-steel-3-8",
    name: 'To 3/8" thick',
    category: "Torch cutting steel plates",
    unit: "LF",
    manhourUnit: 0.073,
  },

  // Light wood-framed structures
  {
    id: "comm-light-wood-framed",
    name: "Light wood-framed structures",
    category: "Light wood-framed structures",
    unit: "SF",
    manhourUnit: 0.08,
  },
  {
    id: "comm-light-wood-framed-first",
    name: "First story",
    category: "Light wood-framed structures",
    unit: "SF",
    manhourUnit: 0.038,
  },
  {
    id: "comm-light-wood-framed-second",
    name: "Second story",
    category: "Light wood-framed structures",
    unit: "SF",
    manhourUnit: 0.053,
  },
  {
    id: "comm-light-wood-framed-third",
    name: "Third story",
    category: "Light wood-framed structures",
    unit: "SF",
    manhourUnit: 0.07,
  },

  // Building demolition with pneumatic tools
  {
    id: "comm-building-demo-pneumatic",
    name: "Building demolition with pneumatic tools",
    category: "Building demolition with pneumatic tools",
    unit: "CF",
    manhourUnit: 0.01,
  },
  {
    id: "comm-building-demo-pneumatic-concrete",
    name: "Concrete building",
    category: "Building demolition with pneumatic tools",
    unit: "SF",
    manhourUnit: 0.089,
  },
  {
    id: "comm-building-demo-pneumatic-reinforced",
    name: "Reinforced concrete building",
    category: "Building demolition with pneumatic tools",
    unit: "SF",
    manhourUnit: 0.101,
  },
  {
    id: "comm-building-demo-pneumatic-masonry",
    name: "Masonry building",
    category: "Building demolition with pneumatic tools",
    unit: "SF",
    manhourUnit: 0.074,
  },

  // Building demolition with crane and headache ball
  {
    id: "comm-building-demo-crane",
    name: "Building demolition with crane and headache ball",
    category: "Building demolition with crane and headache ball",
    unit: "CF",
    manhourUnit: 0.005,
  },
  {
    id: "comm-building-demo-crane-concrete",
    name: "Concrete building",
    category: "Building demolition with crane and headache ball",
    unit: "SF",
    manhourUnit: 0.031,
  },
  {
    id: "comm-building-demo-crane-reinforced",
    name: "Reinforced concrete building",
    category: "Building demolition with crane and headache ball",
    unit: "SF",
    manhourUnit: 0.037,
  },
  {
    id: "comm-building-demo-crane-masonry",
    name: "Masonry building",
    category: "Building demolition with crane and headache ball",
    unit: "SF",
    manhourUnit: 0.026,
  },

  // Concrete foundation and footing
  {
    id: "comm-concrete-foundation",
    name: "Concrete foundation and footing",
    category: "Concrete foundation and footing",
    unit: "CF",
    manhourUnit: 0.2,
  },
  {
    id: "comm-concrete-foundation-non-reinforced",
    name: "Non-reinforced concrete",
    category: "Concrete foundation and footing",
    unit: "CY",
    manhourUnit: 1.1,
  },
  {
    id: "comm-concrete-foundation-reinforced",
    name: "Reinforced concrete",
    category: "Concrete foundation and footing",
    unit: "CY",
    manhourUnit: 1.58,
  },
  {
    id: "comm-concrete-foundation-chip",
    name: "Chip out concrete using paving breaker no dozer used",
    category: "Concrete foundation and footing",
    unit: "CF",
    manhourUnit: 0.203,
  },

  // Gutting a building
  {
    id: "comm-gutting-building",
    name: "Gutting a building",
    category: "Gutting a building",
    unit: "SF",
    manhourUnit: 0.1,
  },
  {
    id: "comm-gutting-building-residential",
    name: "Residential buildings",
    category: "Gutting a building",
    unit: "SF",
    manhourUnit: 0.11,
  },
  {
    id: "comm-gutting-building-commercial",
    name: "Commercial buildings",
    category: "Gutting a building",
    unit: "SF",
    manhourUnit: 0.1,
  },

  // Brick or block wall
  {
    id: "comm-brick-block-wall",
    name: "Brick or block wall",
    category: "Brick or block wall",
    unit: "SF",
    manhourUnit: 0.12,
  },
  {
    id: "comm-brick-block-wall-4",
    name: '4" thick partition',
    category: "Brick or block wall",
    unit: "SF",
    manhourUnit: 0.04,
  },
  {
    id: "comm-brick-block-wall-8",
    name: '8" thick partition',
    category: "Brick or block wall",
    unit: "SF",
    manhourUnit: 0.057,
  },
  {
    id: "comm-brick-block-wall-12",
    name: '12" thick partition',
    category: "Brick or block wall",
    unit: "SF",
    manhourUnit: 0.073,
  },

  // Concrete partition
  {
    id: "comm-concrete-partition",
    name: "Concrete partition",
    category: "Concrete partition",
    unit: "SF",
    manhourUnit: 0.15,
  },
  {
    id: "comm-concrete-partition-non-reinforced",
    name: "Non-reinforced",
    category: "Concrete partition",
    unit: "CF",
    manhourUnit: 0.273,
  },
  {
    id: "comm-concrete-partition-reinforced",
    name: "Reinforced",
    category: "Concrete partition",
    unit: "CF",
    manhourUnit: 0.363,
  },

  // Knock down with hand tools and pile, no removal
  {
    id: "comm-knockdown-hand-tools",
    name: "Knock down with hand tools and pile, no removal",
    category: "Knock down with hand tools",
    unit: "SF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-knockdown-hand-tools-stud-gypsum",
    name: "Stud partition gypsum or terra cotta on metal lath",
    category: "Knock down with hand tools",
    unit: "SF",
    manhourUnit: 0.027,
  },
  {
    id: "comm-knockdown-hand-tools-stud-drywall",
    name: "Stud partition drywall on metal or wood studs",
    category: "Knock down with hand tools",
    unit: "SF",
    manhourUnit: 0.028,
  },
  {
    id: "comm-knockdown-hand-tools-stud-plaster",
    name: "Stud partition plaster on metal studs",
    category: "Knock down with hand tools",
    unit: "SF",
    manhourUnit: 0.026,
  },

  // Plaster ceilings
  {
    id: "comm-plaster-ceilings",
    name: "Plaster ceilings",
    category: "Plaster ceilings",
    unit: "SF",
    manhourUnit: 0.08,
  },
  {
    id: "comm-plaster-ceilings-lath",
    name: "Including lath and furring",
    category: "Plaster ceilings",
    unit: "SF",
    manhourUnit: 0.025,
  },
  {
    id: "comm-plaster-ceilings-grid",
    name: "Including suspended grid",
    category: "Plaster ceilings",
    unit: "SF",
    manhourUnit: 0.02,
  },

  // Acoustical tile ceiling
  {
    id: "comm-acoustical-tile-ceiling",
    name: "Acoustical tile ceiling",
    category: "Acoustical tile ceiling",
    unit: "SF",
    manhourUnit: 0.025,
  },
  {
    id: "comm-acoustical-tile-ceiling-grid",
    name: "Including suspended grid",
    category: "Acoustical tile ceiling",
    unit: "SF",
    manhourUnit: 0.01,
  },
  {
    id: "comm-acoustical-tile-ceiling-salvage",
    name: "Including grid in salvage condition",
    category: "Acoustical tile ceiling",
    unit: "SF",
    manhourUnit: 0.019,
  },
  {
    id: "comm-acoustical-tile-ceiling-furring",
    name: "Including strip furring",
    category: "Acoustical tile ceiling",
    unit: "SF",
    manhourUnit: 0.014,
  },
  {
    id: "comm-acoustical-tile-ceiling-glued",
    name: "Tile glued to ceiling",
    category: "Acoustical tile ceiling",
    unit: "SF",
    manhourUnit: 0.015,
  },

  // Drywall ceiling
  {
    id: "comm-drywall-ceiling",
    name: "Drywall ceiling",
    category: "Drywall ceiling",
    unit: "SF",
    manhourUnit: 0.03,
  },
  {
    id: "comm-drywall-ceiling-joists",
    name: "Nailed or attached with screws to joists",
    category: "Drywall ceiling",
    unit: "SF",
    manhourUnit: 0.012,
  },
  {
    id: "comm-drywall-ceiling-furring",
    name: "Including strip furring",
    category: "Drywall ceiling",
    unit: "SF",
    manhourUnit: 0.023,
  },

  // Roof demolition
  {
    id: "comm-roof-demolition",
    name: "Roof demolition",
    category: "Roof demolition",
    unit: "SF",
    manhourUnit: 0.04,
  },
  {
    id: "comm-roof-demolition-asphalt",
    name: "Asphalt shingles",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 0.85,
  },
  {
    id: "comm-roof-demolition-built-up",
    name: "Built-up roofing including sheathing and gravel",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 2.91,
  },
  {
    id: "comm-roof-demolition-tile",
    name: "Clay or concrete tile",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 1.03,
  },
  {
    id: "comm-roof-demolition-concrete",
    name: "Concrete plank no covering",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 1.1,
  },
  {
    id: "comm-roof-demolition-gypsum",
    name: "Gypsum plank no covering",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 0.82,
  },
  {
    id: "comm-roof-demolition-metal",
    name: "Metal deck no covering",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 2.27,
  },
  {
    id: "comm-roof-demolition-wood",
    name: "Wood shingles",
    category: "Roof demolition",
    unit: "Sq",
    manhourUnit: 0.756,
  },
  {
    id: "comm-roof-demolition-gravel",
    name: "Remove gravel stop",
    category: "Roof demolition",
    unit: "LF",
    manhourUnit: 0.07,
  },

  // Slab on grade 4" to 6" reinforced
  {
    id: "comm-slab-on-grade-4-6",
    name: 'Slab on grade 4" to 6" reinforced',
    category: "Slab on grade",
    unit: "SF",
    manhourUnit: 0.06,
  },
  {
    id: "comm-slab-on-grade-mesh",
    name: "With mesh",
    category: "Slab on grade",
    unit: "SF",
    manhourUnit: 0.057,
  },
  {
    id: "comm-slab-on-grade-bars",
    name: "With number 4 bars",
    category: "Slab on grade",
    unit: "SF",
    manhourUnit: 0.063,
  },
  {
    id: "comm-slab-on-grade-suspended",
    name: 'Slab suspended 6" to 8" thick free fall',
    category: "Slab on grade",
    unit: "SF",
    manhourUnit: 0.092,
  },

  // Slab fill lightweight concrete fill
  {
    id: "comm-slab-fill-lightweight",
    name: "Slab fill lightweight concrete fill",
    category: "Slab fill",
    unit: "CF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-slab-fill-metal-deck",
    name: "On metal deck",
    category: "Slab fill",
    unit: "SF",
    manhourUnit: 0.029,
  },
  {
    id: "comm-slab-fill-insulating",
    name: "Insulating topping",
    category: "Slab fill",
    unit: "SF",
    manhourUnit: 0.023,
  },

  // Floor covering
  {
    id: "comm-floor-covering",
    name: "Floor covering",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.02,
  },
  {
    id: "comm-floor-covering-ceramic",
    name: "Ceramic or quarry tile or brick",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.029,
  },
  {
    id: "comm-floor-covering-resilient",
    name: "Resilient materials only",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.018,
  },
  {
    id: "comm-floor-covering-terrazzo",
    name: "Terrazzo tile",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.032,
  },
  {
    id: "comm-floor-covering-wood-block",
    name: "Wood block floor laid in mastic",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.051,
  },
  {
    id: "comm-floor-covering-wood-strip",
    name: "Wood residential strip floor",
    category: "Floor covering",
    unit: "SF",
    manhourUnit: 0.032,
  },

  // Cutting openings into framed walls
  {
    id: "comm-cutting-openings-walls",
    name: "Cutting openings into framed walls",
    category: "Cutting openings",
    unit: "SF",
    manhourUnit: 0.2,
  },
  {
    id: "comm-cutting-openings-metal-stud",
    name: "Metal stud wall with stucco or plaster",
    category: "Cutting openings",
    unit: "SF",
    manhourUnit: 0.094,
  },
  {
    id: "comm-cutting-openings-wood-stud",
    name: "Wood stud wall with drywall",
    category: "Cutting openings",
    unit: "SF",
    manhourUnit: 0.051,
  },
  {
    id: "comm-cutting-openings-dust-control",
    name: "Dust control partitions 6 mil plastic",
    category: "Cutting openings",
    unit: "SF",
    manhourUnit: 0.011,
  },

  // Debris removal
  {
    id: "comm-debris-removal",
    name: "Debris removal",
    category: "Debris removal",
    unit: "CY",
    manhourUnit: 0.5,
  },
  {
    id: "comm-debris-removal-50",
    name: "Wheelbarrow 50' to trash chute and dump",
    category: "Debris removal",
    unit: "CF",
    manhourUnit: 0.018,
  },
  {
    id: "comm-debris-removal-100",
    name: "Wheelbarrow 100' to trash chute and dump",
    category: "Debris removal",
    unit: "CF",
    manhourUnit: 0.022,
  },
  {
    id: "comm-debris-removal-elevator",
    name: "Wheelbarrow 50' to elevator descend 10 floors to trash chute and dump",
    category: "Debris removal",
    unit: "CF",
    manhourUnit: 0.024,
  },

  // Load demolition debris on a truck
  {
    id: "comm-load-debris-truck",
    name: "Load demolition debris on a truck",
    category: "Load demolition debris",
    unit: "CY",
    manhourUnit: 0.3,
  },
  {
    id: "comm-load-debris-truck-hand",
    name: "Truck loaded by hand",
    category: "Load demolition debris",
    unit: "CY",
    manhourUnit: 0.828,
  },
  {
    id: "comm-load-debris-truck-loader",
    name: "Truck loaded using a wheel loader",
    category: "Load demolition debris",
    unit: "CY",
    manhourUnit: 0.3, // Assuming the same value as the existing item since no value was provided
  },

  // Hollow metal doors and frame
  {
    id: "comm-hollow-metal-doors",
    name: "Hollow metal doors and frame",
    category: "Hollow metal doors",
    unit: "EA",
    manhourUnit: 1.0,
  },
  {
    id: "comm-hollow-metal-doors-single",
    name: "Single door to 4' x 7'",
    category: "Hollow metal doors and frame in a masonry wall",
    unit: "EA",
    manhourUnit: 1.0,
  },
  {
    id: "comm-hollow-metal-doors-double",
    name: "Two doors per opening to 8' x 7'",
    category: "Hollow metal doors and frame in a masonry wall",
    unit: "EA",
    manhourUnit: 1.5,
  },

  // Wood door and frame
  {
    id: "comm-wood-door-frame",
    name: "Wood door and frame",
    category: "Wood door and frame",
    unit: "EA",
    manhourUnit: 0.75,
  },
  {
    id: "comm-wood-door-frame-single",
    name: "Single door to 4' x 7'",
    category: "Wood door and frame in a wood framed wall",
    unit: "EA",
    manhourUnit: 0.5,
  },
  {
    id: "comm-wood-door-frame-double",
    name: "Two doors per opening to 8' x 7'",
    category: "Wood door and frame in a wood framed wall",
    unit: "EA",
    manhourUnit: 0.75,
  },

  // Door and frame in masonry wall
  {
    id: "comm-door-frame-masonry",
    name: "Door and frame in masonry wall",
    category: "Door and frame in masonry wall",
    unit: "EA",
    manhourUnit: 1.5,
  },
  {
    id: "comm-door-frame-masonry-hollow-metal",
    name: "Hollow metal door to 4' x 7'",
    category: "Door and frame in masonry wall salvage condition",
    unit: "EA",
    manhourUnit: 0.5,
  },
  {
    id: "comm-door-frame-masonry-wood",
    name: "Wood door to 4' x 7'",
    category: "Door and frame in masonry wall salvage condition",
    unit: "EA",
    manhourUnit: 1.0,
  },

  // Frame for resilient mat
  {
    id: "comm-frame-resilient-mat",
    name: "Frame for resilient mat",
    category: "Frame for resilient mat",
    unit: "LF",
    manhourUnit: 0.1,
  },
  {
    id: "comm-frame-resilient-mat-sf",
    name: "Frame for resilient metal mat",
    category: "Frame for resilient mat",
    unit: "SF",
    manhourUnit: 0.054,
  },

  // Lockers
  {
    id: "comm-lockers",
    name: "Lockers",
    category: "Lockers",
    unit: "EA",
    manhourUnit: 0.5,
  },
  {
    id: "comm-lockers-metal",
    name: 'Metal 12" W 60"H 15" D',
    category: "Lockers",
    unit: "EA",
    manhourUnit: 0.5,
  },

  // Bathroom accessories
  {
    id: "comm-bathroom-accessories",
    name: "Bathroom accessories",
    category: "Bathroom accessories",
    unit: "EA",
    manhourUnit: 0.3,
  },
  {
    id: "comm-bathroom-accessories-sink",
    name: "Sink and soap dispenser wall hung",
    category: "Bathroom accessories",
    unit: "EA",
    manhourUnit: 0.5,
  },
  {
    id: "comm-bathroom-accessories-toilet",
    name: "Toilet partition wood or metal per partition",
    category: "Bathroom accessories",
    unit: "EA",
    manhourUnit: 0.75,
  },
  {
    id: "comm-bathroom-accessories-urinal",
    name: "Urinal screens wood or metal per partition",
    category: "Bathroom accessories",
    unit: "EA",
    manhourUnit: 0.5,
  },

  // Window and Frame
  {
    id: "comm-window-frame",
    name: "Window and Frame",
    category: "Window and Frame",
    unit: "EA",
    manhourUnit: 1.0,
  },
  {
    id: "comm-window-frame-wood-metal",
    name: "Wood or metal",
    category: "Window and Frame",
    unit: "SF",
    manhourUnit: 0.076,
  },

  // Airlock doors
  {
    id: "comm-airlock-doors",
    name: "Airlock doors",
    category: "Airlock doors",
    unit: "EA",
    manhourUnit: 2.0,
  },
  {
    id: "comm-airlock-doors-reset",
    name: "Remove and reset airlock doors",
    category: "Airlock doors",
    unit: "EA",
    manhourUnit: 5.56,
  },

  // Structure moving - Concrete or masonry
  {
    id: "comm-structure-moving-concrete",
    name: "Structure moving - Concrete or masonry",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.5,
  },
  {
    id: "comm-structure-moving-concrete-1000-2000",
    name: "1000 to 2000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.168,
  },
  {
    id: "comm-structure-moving-concrete-2000-4000",
    name: "2000 to 4000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.149,
  },

  // Structure moving - wood frame
  {
    id: "comm-structure-moving-wood",
    name: "Structure moving - wood frame",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.3,
  },
  {
    id: "comm-structure-moving-wood-1000-2000",
    name: "1000 to 2000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.142,
  },
  {
    id: "comm-structure-moving-wood-2000-4000",
    name: "2000 to 4000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.131,
  },

  // Structure moving - steel frame
  {
    id: "comm-structure-moving-steel",
    name: "Structure moving - steel frame",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.4,
  },
  {
    id: "comm-structure-moving-steel-1000-2000",
    name: "1000 to 2000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.215,
  },
  {
    id: "comm-structure-moving-steel-2000-4000",
    name: "2000 to 4000SF",
    category: "Structure moving",
    unit: "SF",
    manhourUnit: 0.199,
  },

  // Concrete structures
  {
    id: "comm-concrete-slab-6",
    name: '6" reinforced concrete slab',
    category: "Concrete structures",
    unit: "SF",
    manhourUnit: 0.075,
  },
  {
    id: "comm-concrete-slab-8",
    name: '8" reinforced concrete slab',
    category: "Concrete structures",
    unit: "SF",
    manhourUnit: 0.098,
  },
  {
    id: "comm-concrete-slab-12",
    name: '12" reinforced concrete slab',
    category: "Concrete structures",
    unit: "SF",
    manhourUnit: 0.176,
  },
  {
    id: "comm-concrete-wall-8",
    name: '8" reinforced concrete wall',
    category: "Concrete structures",
    unit: "SF",
    manhourUnit: 0.12,
  },
  {
    id: "comm-concrete-wall-12",
    name: '12" reinforced concrete wall',
    category: "Concrete structures",
    unit: "SF",
    manhourUnit: 0.176,
  },

  // Steel structures
  {
    id: "comm-steel-beam-w8",
    name: "W8 steel beam",
    category: "Steel structures",
    unit: "LF",
    manhourUnit: 0.25,
  },
  {
    id: "comm-steel-beam-w10",
    name: "W10 steel beam",
    category: "Steel structures",
    unit: "LF",
    manhourUnit: 0.33,
  },
  {
    id: "comm-steel-beam-w12",
    name: "W12 steel beam",
    category: "Steel structures",
    unit: "LF",
    manhourUnit: 0.42,
  },
  {
    id: "comm-steel-column-w8",
    name: "W8 steel column",
    category: "Steel structures",
    unit: "LF",
    manhourUnit: 0.28,
  },
  {
    id: "comm-steel-column-w10",
    name: "W10 steel column",
    category: "Steel structures",
    unit: "LF",
    manhourUnit: 0.36,
  },

  // Commercial roofing
  {
    id: "comm-roofing-epdm",
    name: "EPDM membrane roofing",
    category: "Commercial roofing",
    unit: "SF",
    manhourUnit: 0.04,
  },
  {
    id: "comm-roofing-tpo",
    name: "TPO membrane roofing",
    category: "Commercial roofing",
    unit: "SF",
    manhourUnit: 0.045,
  },
  {
    id: "comm-roofing-modified-bitumen",
    name: "Modified bitumen roofing",
    category: "Commercial roofing",
    unit: "SF",
    manhourUnit: 0.05,
  },

  // Commercial flooring
  {
    id: "comm-flooring-vct",
    name: "Vinyl composition tile (VCT)",
    category: "Commercial flooring",
    unit: "SF",
    manhourUnit: 0.02,
  },
  {
    id: "comm-flooring-carpet-tile",
    name: "Carpet tile",
    category: "Commercial flooring",
    unit: "SF",
    manhourUnit: 0.018,
  },
  {
    id: "comm-flooring-epoxy",
    name: "Epoxy flooring",
    category: "Commercial flooring",
    unit: "SF",
    manhourUnit: 0.035,
  },

  // Commercial walls
  {
    id: "comm-walls-metal-stud",
    name: "Metal stud partition wall",
    category: "Commercial walls",
    unit: "SF",
    manhourUnit: 0.03,
  },
  {
    id: "comm-walls-cmu-8",
    name: '8" CMU wall',
    category: "Commercial walls",
    unit: "SF",
    manhourUnit: 0.098,
  },
  {
    id: "comm-walls-cmu-12",
    name: '12" CMU wall',
    category: "Commercial walls",
    unit: "SF",
    manhourUnit: 0.14,
  },

  // Commercial ceilings
  {
    id: "comm-ceiling-suspended",
    name: "Suspended acoustic ceiling",
    category: "Commercial ceilings",
    unit: "SF",
    manhourUnit: 0.025,
  },
  {
    id: "comm-ceiling-gypsum",
    name: "Gypsum board ceiling",
    category: "Commercial ceilings",
    unit: "SF",
    manhourUnit: 0.03,
  },

  // Commercial doors and windows
  {
    id: "comm-door-hollow-metal",
    name: "Hollow metal door and frame",
    category: "Commercial doors and windows",
    unit: "EA",
    manhourUnit: 1.5,
  },
  {
    id: "comm-door-storefront",
    name: "Storefront door",
    category: "Commercial doors and windows",
    unit: "EA",
    manhourUnit: 2.0,
  },
  {
    id: "comm-window-storefront",
    name: "Storefront window system",
    category: "Commercial doors and windows",
    unit: "SF",
    manhourUnit: 0.08,
  },
  {
    id: "comm-window-curtainwall",
    name: "Curtain wall system",
    category: "Commercial doors and windows",
    unit: "SF",
    manhourUnit: 0.1,
  },

  // Commercial fixtures
  {
    id: "comm-fixture-toilet",
    name: "Commercial toilet",
    category: "Commercial fixtures",
    unit: "EA",
    manhourUnit: 1.2,
  },
  {
    id: "comm-fixture-urinal",
    name: "Urinal",
    category: "Commercial fixtures",
    unit: "EA",
    manhourUnit: 1.0,
  },
  {
    id: "comm-fixture-sink",
    name: "Commercial sink",
    category: "Commercial fixtures",
    unit: "EA",
    manhourUnit: 0.8,
  },
  {
    id: "comm-fixture-water-fountain",
    name: "Water fountain",
    category: "Commercial fixtures",
    unit: "EA",
    manhourUnit: 1.1,
  },

  // Mechanical equipment
  {
    id: "comm-mech-ahu",
    name: "Air handling unit",
    category: "Mechanical equipment",
    unit: "EA",
    manhourUnit: 8.0,
  },
  {
    id: "comm-mech-vav",
    name: "VAV box",
    category: "Mechanical equipment",
    unit: "EA",
    manhourUnit: 2.0,
  },
  {
    id: "comm-mech-ductwork",
    name: "Metal ductwork",
    category: "Mechanical equipment",
    unit: "LF",
    manhourUnit: 0.15,
  },
  {
    id: "comm-mech-diffuser",
    name: "Ceiling diffuser",
    category: "Mechanical equipment",
    unit: "EA",
    manhourUnit: 0.5,
  },

  // Electrical equipment
  {
    id: "comm-elec-panel",
    name: "Electrical panel",
    category: "Electrical equipment",
    unit: "EA",
    manhourUnit: 3.0,
  },
  {
    id: "comm-elec-conduit",
    name: "Electrical conduit",
    category: "Electrical equipment",
    unit: "LF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-elec-lighting",
    name: "Commercial light fixture",
    category: "Electrical equipment",
    unit: "EA",
    manhourUnit: 0.75,
  },

  // Site work
  {
    id: "comm-site-asphalt",
    name: "Asphalt paving",
    category: "Site work",
    unit: "SF",
    manhourUnit: 0.03,
  },
  {
    id: "comm-site-concrete",
    name: "Concrete paving",
    category: "Site work",
    unit: "SF",
    manhourUnit: 0.05,
  },
  {
    id: "comm-site-curb",
    name: "Concrete curb and gutter",
    category: "Site work",
    unit: "LF",
    manhourUnit: 0.422,
  },

  // Hazardous materials
  {
    id: "comm-hazmat-asbestos",
    name: "Asbestos containing material",
    category: "Hazardous materials",
    unit: "SF",
    manhourUnit: 0.15,
  },
  {
    id: "comm-hazmat-lead-paint",
    name: "Lead-based paint",
    category: "Hazardous materials",
    unit: "SF",
    manhourUnit: 0.1,
  },
  {
    id: "comm-hazmat-pcb",
    name: "PCB ballasts/transformers",
    category: "Hazardous materials",
    unit: "EA",
    manhourUnit: 0.5,
  },
]
