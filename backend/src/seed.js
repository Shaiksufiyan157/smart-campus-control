// const myLocalFile = 'C:/Users/shaik/Desktop/smart campus control/backend/src/seed/2502.06329v1.pdf';

// /**
//  * Uploads one file and adds its URL to ALL faculty members.
//  */
// const addPaperToAllFaculty = async () => {
//     try {
//         console.log('--- Starting Script ---');
        
//         // Get the filename (e.g., "2502.06329v1")
//         const publicId = path.parse(myLocalFile).name;

//         // 4. UPLOAD THE FILE *ONCE*
//         console.log(`Uploading ${myLocalFile} to Cloudinary...`);
//         const uploadedFile = await cloudinary.uploader.upload(myLocalFile, {
//             public_id: publicId,
//             overwrite: true,
//             resource_type: "auto"
//         });
//         console.log(`✅ File Uploaded: ${uploadedFile.secure_url}`);

//         // 5. CREATE THE OBJECT TO ADD
//         const paperToAdd = {
//             url: uploadedFile.secure_url,
//             filename: uploadedFile.public_id,
//         };

//         // 6. FIND ALL FACULTY
//         const faculties = await Faculty.find({});
//         console.log(`Found ${faculties.length} faculty members. Adding paper...`);

//         // 7. LOOP AND UPDATE
//         for (const faculty of faculties) {
//             // Add the paper object to the array
//             faculty.paper_published.push(paperToAdd);
            
//             // Save each change
//             await faculty.save();
//             console.log(`Updated faculty: ${faculty.name}`);
//         }

//         console.log('\n--- Script Finished ---');
//         console.log('All faculty members have been updated.');

//     } catch (e) {
//         console.error("Error running seed script:", e.message);
//     } finally {
//         // 8. Close the database connection
//         console.log('Closing database connection.');
//         mongoose.connection.close();
//     }
// };

// // 9. RUN THE SCRIPT
// addPaperToAllFaculty();