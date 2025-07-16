
import dotenv from 'dotenv';
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_KEY,
api_secret:process.env.CLOUD_SECRET
});
// cloudinary.Uploader.upload("my_document.pdf", :use_filename => true, :unique_filename => false)
const storage=new CloudinaryStorage({
cloudinary,
params:{
folder:'backend',
allowedFormats:['jpeg','png','jpg','pdf'],
// public_id: (req, file) => {
//       const fileName = path.basename(file.originalname, path.extname(file.originalname));
//       return fileName;  // Use the original filename (without extension) as the public_id
//     }
}
});

const cloud={
cloudinary,
storage
}

export default cloud;

