import React, { useState } from 'react';
import './projects.css';
import images from './images';

function Projects() {
  const [activeCategory, setActiveCategory] = useState('CS');
  const [projectIndexes, setProjectIndexes] = useState({});
  

  const csProjects = [
    {
      name: 'TrailMatch: Hiking Made Easy',
      description: 'TrailMatch combines ChatGPT API with ArcGIS Online products to present the user\'s ideal hiking trail, complete with a sunshine rating and locations of essential amenities like gas and electric charging stations. This synergy ensures a tailored and hassle-free outdoor experience, enhancing every step with interactive guidance and practical information.',
      images: [images.trailmatchImage, images.trailMatchCardImage, images.trailMatchMapImage],
    },
    {
      name: 'Mapping Vernal Swale Italian Thistle Invasion',
      description: 'This project involves conducting precise aerial imaging of the Vernal Swale at Sedgwick Reserve using a DJI Mavic 3 M drone equipped with an RTK receiver, integrated with ArcGIS Field Maps, to accurately map the current distribution of the invasive species Italian Thistle. It also includes analyzing the UAV imagery with Agisoft Metashape and utilizing ArcGIS Pro to predict the future spread of Italian Thistle, significantly enhancing the area\'s ecological impact assessment.',
      image: images.vernal_swale,
    },
    {
      name: 'Bruin Bus Stop Locator',
      description: 'The Bus Stop Locator for Bruins is a Python-scripted toolbox built in ArcGIS Pro. The purpose of this project is to help locate bus stops within a desired proximity and provide recommendations on which buses to take based on current user inputted data. As output, it generates directions on which bus stops and routes to take in terminal and generates visual layouts of such directions.',
      images: [
        images.bruin_bus_stop_locator_final_route_output,
        images.bruin_bus_stop_locator_terminal,
        images.bruin_bus_stop_locator_closest_facility_1,
        images.bruin_bus_stop_locator_closest_facility_2
      ],
    },
    {
      name: 'HaggleHaul',
      description: 'HaggleHaul is a web app designed to democratize ridesharing and allow users to schedule rides in advance amidst surge pricing and ride deserts. It features separate account types for Riders and Drivers, enabling Riders to post and receive bids for prescheduled trips. Riders can then select the most suitable driver based on bids received, thus determining the cost and driver for their trip.',
      image: images.HaggleHaul,
    },
    {
      name: 'Bruin Bites',
      description: 'Bruin Bites is a website that allows UCLA students to more easily connect with their friends through food! Right off the bat, a new user can use the website to view what each restaurant/take-out option is serving, view their respective ratings, and even make them themselves.',
      image: images.BruinBitesImage,
    },
    {
      name: 'California Cities Weather Dashboard',
      description: 'This was made with ArcGIS Pro and ArcGIS Dashboards, showcasing California\'s highest temperatures during the month of August. The interactive map highlights statewide temperature patterns and identifies major cities\' hottest and coldest points, fusing application design and data analytics with the power of GIS.',
      image: images.DashboardImage,
    },
    {
      name: 'TeraScope: Dynamic Earth Observation Explorer',
      description: 'GeoExplorer: Dynamic Earth Observation Explorer leverages the Google Earth Engine\'s JavaScript API to enable an interactive exploration of NAIP imagery across California. It allows for dynamic selection of regions, sub-regions, and types of imagery according to user inputs. The application incorporates advanced GIS techniques, including spatial interpolation and raster calculations, and integrates FAO GAUL data for accurate mapping of administrative divisions. This is further enhanced through a custom UI panel developed in JavaScript, offering a sophisticated yet user-friendly experience in visualizing geospatial data.',
      image: images.geoexplorer_base
    },
    {
      name: 'Sage Hill National Park Drone Imagery Analysis',
      description: 'My Sage Hill National Park Drone Imagery project utilizes a DJI Mavic 3 drone equipped with an Altum sensor to map the park\'s landscape. The left image displays processed drone imagery, highlighting the flight path (orange) and capture points (yellow). The right image shows the raw imagery. Pink points on both represent manual data collection sites, essential for verifying the orthomosaic\'s radiometric accuracy from the drone\'s multispectral imaging.',
      image: images.DroneImagery,
    },
    // Add more CS projects as needed
  ];

  const gisProjects = [
  
    // Add more GIS projects as needed
  ];

   // Function to chunk the project array into sub-arrays of length 2
   const chunkedProjects = (projects) => {
    const chunked = [];
    for (let i = 0; i < projects.length; i += 2) {
      chunked.push(projects.slice(i, i + 2));
    }
    return chunked;
  };

  const handleNavigation = (projectName, offset, length) => {
    setProjectIndexes(prevIndexes => {
      const currentIndex = (prevIndexes[projectName] || 0) + offset;
      const newIndex = (currentIndex + length) % length; // Wrap around the images
      return { ...prevIndexes, [projectName]: newIndex };
    });
  };

  const getCurrentIndex = projectName => {
    return projectIndexes[projectName] || 0;
  };

  const displayedProjects = activeCategory === 'CS' ? csProjects : gisProjects;
  const chunkedDisplayProjects = chunkedProjects(displayedProjects, 3);

  return (
    <section className="projects-section">
      <h2>Projects</h2>
      {/* <div className="project-category-buttons">
        <button onClick={() => setActiveCategory('CS')} className={activeCategory === 'CS' ? 'active' : ''}>
          Software Projects
        </button>
        <button onClick={() => setActiveCategory('GIS')} className={activeCategory === 'GIS' ? 'active' : ''}>
          GIS Projects
        </button>
      </div> */}
      {chunkedDisplayProjects.map((projectRow, rowIndex) => (
        <div className="project-row" key={rowIndex}>
          {projectRow.map((project, projectIndex) => (
        <div className="project" key={projectIndex}>
        <h3>{project.name}</h3>
        <div className="project-image-container">
          {project.images && project.images.length > 1 && ( // Only render buttons if there are multiple images
            <>
              <button 
                className="arrow-button left-arrow" 
                onClick={() => handleNavigation(project.name, -1, project.images.length)}
              >
                ←
              </button>
              {/* The container div for images with a dynamic inline style for transitions */}
              <div
                className="project-images"
                style={{
                  transform: `translateX(-${getCurrentIndex(project.name, project.images.length) * 100}%)`,
                  transition: 'transform 0.5s ease-out' // This adds the transition effect
                }}
              >
                {/* Map over the images and render each one */}
                {project.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`${project.name} image`}
                    className="project-image"
                  />
                ))}
              </div>
              <button 
                className="arrow-button right-arrow" 
                onClick={() => handleNavigation(project.name, 1, project.images.length)}
              >
                →
              </button>
            </>
          )}
          {(!project.images || project.images.length === 1) && ( // Render single image without buttons
            <img src={project.image || project.images[0]} alt={`${project.name} image`} className="project-image"/>
          )}
        </div>
        <p>{project.description}</p>
      </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Projects;