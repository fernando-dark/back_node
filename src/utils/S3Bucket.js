const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class S3Bucket {
    constructor({ accessKeyId, secretAccessKey, region, bucketName }) {
        // Configurar cliente S3
        this.s3 = new S3Client({
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            region,
        });

        // Configurar bucket
        this.bucketName = bucketName;
    }

    async uploadImage(req, fileKey) {
        try {
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: fileKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'private', // Control de acceso
            });

            const uploadResult = await this.s3.send(command);
            console.log('Imagen subida con éxito:', uploadResult);
            return {
                Bucket: this.bucketName,
                Key: fileKey,
                ETag: uploadResult.ETag,
            };
        } catch (error) {
            console.error('Error al subir imagen:', error);
            throw error;
        }
    }

    async getSignedUrl(fileName, expiresIn = 60) {
        try {

            if (!fileName) {
                throw new Error('No se proporcionó un nombre de archivo válido.');
            }
    
            console.log('Generando URL firmada para el archivo:', fileName);
    
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: fileName,
                Expires: 300 
            });
    
            const signedUrl = await getSignedUrl(this.s3, command, { expiresIn });
            console.log('URL firmada generada con éxito:', signedUrl);
            return signedUrl;
        } catch (error) {
            console.error('Error al generar URL firmada:', error);
            throw error;
        }
    }
    
}

module.exports = S3Bucket;
