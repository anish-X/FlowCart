import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once here — every component imports from this file, never from "gsap" directly.
// Registering the same plugin multiple times causes a GSAP warning and wastes memory.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
