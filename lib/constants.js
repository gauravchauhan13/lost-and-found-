/* ============================================================
   FindIt UPES — Constants & Config
   ============================================================ */

export const CAMPUS_LOCATIONS = {
  // Blocks with 5 floors (Basement, Ground, 1st, 2nd, 3rd)
  "Block 1": ["Classrooms", "Labs", "Study Area"],
  "Block 9": ["Classrooms", "Labs", "Study Area"],
  "Block 10": ["Classrooms", "Labs", "Study Area"],
  "Block 11": ["Classrooms", "Labs", "Study Area"],
  // Blocks with 4 floors (Basement, Ground, 1st, 2nd)
  "Block 2": ["Classrooms", "Labs", "Study Area"],
  "Block 3": ["Classrooms", "Labs", "Study Area"],
  "Block 4": ["Classrooms", "Labs", "Study Area"],
  "Block 5": ["Classrooms", "Labs", "Study Area"],
  "Block 6": ["Classrooms", "Labs", "Study Area"],
  "Block 7": ["Classrooms", "Labs", "Study Area"],
  "Block 8": ["Classrooms", "Labs", "Study Area"],
  // Other Locations
  "MAC": ["Auditorium", "Gym"],
  "Food Court": ["Seating Area"],
  "Dunkin Donuts": [],
  "Cafe Friesco": ["Counter", "Seating"],
  "Library": ["Reading Room", "Reference Section", "Study Carrels"],
  "Small Ground": ["Open Area"],
  "Main Ground": ["Open Area", "Sports Field"],
  "Boys Hostel": ["Rooms", "Common Area", "Mess"],
  "Girls Hostel": ["Rooms", "Common Area", "Mess"],
  "Infirmary Area": ["Medical Unit", "Waiting Room"],
  "College Gate": ["Entry Point", "Security"],
  "Hubble": ["Lab Space", "Workspace"],
  "New Open Audi": [],
  "Old Open Audi": [],
  "Runway": [],
};

// Floor options for different block types
export const FLOORS = {
  // Blocks 1, 9, 10, 11 - 5 floors
  "5floor": ["Basement", "Ground", "1st Floor", "2nd Floor", "3rd Floor"],
  // Blocks 2-8 - 4 floors
  "4floor": ["Basement", "Ground", "1st Floor", "2nd Floor"],
  // Food Court - 3 floors
  "3floor_foodcourt": ["Ground", "1st Floor", "2nd Floor"],
  // Hubble - 3 floors
  "3floor_hubble": ["Basement", "1st Floor", "2nd Floor"],
  // Generic list
  "all": ["Basement", "Ground", "1st Floor", "2nd Floor", "3rd Floor"],
};

/**
 * Get appropriate floors for a specific block/location
 * @param {string} block - The selected block/location
 * @returns {array} Array of available floors for that block
 */
export function getFloorsForBlock(block) {
  if (!block) return FLOORS.all;
  
  // Blocks with 5 floors (Basement, Ground, 1st, 2nd, 3rd)
  if (["Block 1", "Block 9", "Block 10", "Block 11"].includes(block)) {
    return FLOORS["5floor"];
  }
  
  // Blocks with 4 floors (Basement, Ground, 1st, 2nd)
  if (["Block 2", "Block 3", "Block 4", "Block 5", "Block 6", "Block 7", "Block 8"].includes(block)) {
    return FLOORS["4floor"];
  }
  
  // Food Court - 3 floors (Ground, 1st, 2nd)
  if (block === "Food Court") {
    return FLOORS["3floor_foodcourt"];
  }
  
  // Hubble - 3 floors (Basement, 1st, 2nd)
  if (block === "Hubble") {
    return FLOORS["3floor_hubble"];
  }
  
  // Locations with no floors
  if (["Dunkin Donuts", "New Open Audi", "Old Open Audi", "Runway"].includes(block)) {
    return [];
  }
  
  // Default - return all floors
  return FLOORS.all;
}

export const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/report?type=lost", label: "Report Lost", icon: "🔴" },
  { href: "/report?type=found", label: "Report Found", icon: "🟢" },
];
