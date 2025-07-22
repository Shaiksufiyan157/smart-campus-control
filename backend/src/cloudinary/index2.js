import dotenv from 'dotenv';
dotenv.config()
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';

cloudinary.config({
cloud_name:process.env.CLOUD_NAME2,
api_key:process.env.CLOUD_KEY2,
api_secret:process.env.CLOUD_SECRET2
});
// cloudinary.Uploader.upload("my_document.pdf", :use_filename => true, :unique_filename => false)
const storage2=new CloudinaryStorage({
cloudinary,
params:{
folder:'backend',
allowed_formats:['jpeg','png','jpg','pdf'],
resource_type:'raw'
}
})

const cloud2={
cloudinary,
storage2
}

export default cloud2;