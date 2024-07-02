import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button } from '@nextui-org/react';
import { FiUpload } from 'react-icons/fi';
import { uploadPictureFn } from '@/hooks/queries';
import { onError } from '@/lib/utils';

type ProfilePictureProps = {
    customerId: string;
    src: string;
    alt: string;
};

const ProfilePicture = ({
    customerId,
    src,
    alt,
}: ProfilePictureProps) => {
    const [pictureUrl, setPictureUrl] = useState('');

    const {
        mutate: uploadPicture,
        isPending: isUploadingPicture,
    } = useMutation({
        mutationFn: uploadPictureFn,
        onSuccess(res) {
            if (res.data.success && res.data.customer) {
                alert('Image uploaded successfully!');
            }
        },
        onError(error) {
            onError(error);
        },
    });

    const onImageChange = (image?: File) => {
        if (image) {
            setPictureUrl(URL.createObjectURL(image));
            const formData = new FormData();
            formData.append('image', image);
            uploadPicture({ customerId, image: formData });
        }
    };

    return (
        <div>
            <Avatar
                src={pictureUrl || src}
                alt={alt}
                className="w-32 h-32 text-large mb-4"
            />

            <input
                id="upload-picture"
                type="file"
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files?.[0])}
                style={{ display: 'none' }}
                disabled={isUploadingPicture}
            />

            <label htmlFor="upload-picture">
                <Button
                    variant="solid"
                    color="success"
                    endContent={<FiUpload fontSize="1rem" />}
                    isLoading={isUploadingPicture}
                    fullWidth
                    as="span"
                >
                    Upload
                </Button>
            </label>
        </div>
    );
}

export default ProfilePicture;
