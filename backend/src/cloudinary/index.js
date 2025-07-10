
import dotenv from 'dotenv';
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

cloudinary.config({
cloud_name:process.env.CLOUD_NAME,
api_key:process.env.CLOUD_KEY,
api_secret:process.env.CLOUD_SECRET
});
const storage=new CloudinaryStorage({
cloudinary,
params:{
folder:'backend',
allowedFormats:['jpeg','png','jpg'],
// resource_type:'auto'
}
});

const cloud={
cloudinary,
storage
}

export default cloud;

