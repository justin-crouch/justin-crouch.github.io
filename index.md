---
layout: default
---

<div width="100%" style="display: grid; grid-template-columns: 1fr; justify-items: center;">
  <iframe 
    width="80%"
    style="aspect-ratio: 800 / 450; max-width: 600px;"
    src="https://www.youtube.com/embed/55Cjb-ZzvW8" 
    title="Code Review" 
    frameborder="0" 
    allowfullscreen> 
  </iframe> 
</div>

*Self Assessment*

## Artifact
The artifact is from the CS 360: Mobile Architecture and Programming course. Specifically, this artifact is an Android mobile application designed to help a fictional company in managing their warehouse inventory. The artifact was selected due to its full-stack development, which aligns well with my full-stack development career goal.

## Software design and engineering
This enhancement showcases my skills in UI/UX design, code organization, and the ability to utilize industry standard tools, such as Git for version control and Vue.js for front-end development.

At a consumer level, the artifact was improved in its UI and UX. Before, the artifact had a clunky and confusing UI that was only viewable on mobile Android devices. Now, the UI has a mobile-first design that supports tablet- and desktop-sized screens, whose elements can be interacted with using the keyboard for accessibility.

At a developer level, the artifact was improved in its code structure. Before, the code was vaguely separated into a UI and data layer with non-descriptive variable naming. Now, the project follows the MVVM pattern, which uses Vue.js as the View-Model for more efficient development, Vue.js’ concept of Single-File Components for the View (Single-File Components, 2026), and Pinia for the Model (Pinia, 2026).

The planned course outcome for this enhancement, Course Outcome #4, has been met. Utilizing a widely used front-end framework to implement a modern UI/UX design, while organizing the code using the MVVM pattern, demonstrates the ability to use well-founded techniques and tools that bring value to users.

Learning these techniques and tools was challenging yet rewarding. Using Vue.js as the front-end framework was the most challenging as the technology was novel to me. However, while using it, I found it easier to implement UI and UX features faster than writing pure HTML, CSS, and JavaScript. 

## Algorithms and data structures
This enhancement showcases my skills in analyzing and utilizing appropriate data structures and algorithms to provide value to users. The nature of this artifact is to efficiently allow the management of items in an inventory.

However, in the original artifact, an inventory with hundreds of items can be problematic to navigate for a user since there is a lack of organization when viewing a list of these items and no search feature to ease this burden. The enhancement solves this issue by presenting items in a user’s inventory alphabetically and allows the user to search for items that begin with a specific prefix.

To support the search feature, a Prefix Tree was chosen over other data structures such as a Suffix Array for its ability to add, remove, and look up items in linear time. The enhancement also allows the user to filter for items with specific categories and stock levels, thus providing more potential value to the user.

The planned course outcome for this enhancement, Course Outcome #3, has been met. Multiple data structures were analyzed in their capability to search for a dynamic list of words with the smallest runtime footprint. Although Prefix Trees are identified to potentially require significant memory storage, it can be vastly reduced by collapsing certain sequences of nodes. However, this optimization is not necessary until actual user feedback indicates memory consumption as an issue.

The test-driven development technique was used to develop this enhancement. Specifically, I learned how to design appropriate unit tests with the Vitest tool to guide the implementation of the Prefix Tree. The greatest challenge was integrating the Prefix Tree into the actual application, mainly due to how Vue.js binds the Model and View layers during runtime. However, using integration tests could have lowered the challenge.

## Database

## Course Outcomes
1. Employ strategies for building collaborative environments that enable diverse audiences to support organizational decision making in the field of computer science

2. Design, develop, and deliver professional-quality oral, written, and visual communications that are coherent, technically sound, and appropriately adapted to specific audiences and contexts

3. Design and evaluate computing solutions that solve a given problem using algorithmic principles and computer science practices and standards appropriate to its solution, while managing the trade-offs involved in design choices

4. Demonstrate an ability to use well-founded and innovative techniques, skills, and tools in computing practices for the purpose of implementing computer solutions that deliver value and accomplish industry-specific goals

5. Develop a security mindset that anticipates adversarial exploits in software architecture and designs to expose potential vulnerabilities, mitigate design flaws, and ensure privacy and enhanced security of data and resources

## References
- *Pinia.* (2026). Pinia. https://pinia.vuejs.org/
- *Single-File Componetns.* (2026). Vue.js. https://vuejs.org/guide/scaling-up/sfc.html
