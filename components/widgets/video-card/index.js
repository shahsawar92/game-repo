import Image from "next/image";
import Link from "next/link";

const VideoCard = ({ title, youtubeLink, thumbnail, isLocked }) => {
    return (
        <div className='px-2 flex-1'>
            <div className='relative flex flex-col gap-5 p-4 border-gradient bg-tertiary rounded-lg shadow-md h-[400px]'>
                {/* Thumbnail Image with Lock Overlay */}
                <div className='relative border-gradient h-40 overflow-hidden rounded-lg'>
                    <Image
                        alt={title}
                        src={thumbnail}
                        className='w-full h-full object-cover'
                        layout='fill'
                        priority
                    />
                    {isLocked && (
                        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                            <Image
                                src="/assets/lock.png"
                                alt="Locked"
                                layout="fill"
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className='text-lg lg:text-2xl font-bold h-24'>
                    {title}
                </div>

                {/* YouTube Link */}
                <div className='flex justify-center'>
                    {!isLocked ? (
                        <Link
                            href={youtubeLink}
                            target='_blank'
                            className='w-full text-center py-3 bg-[#7B45D3] hover:bg-[#6939b5] transition text-white px-2 font-extrabold text-base rounded-lg'>
                            Watch Video
                        </Link>
                    ) : (
                        <div className='w-full text-center py-3 bg-gray-500 text-white px-2 font-extrabold text-base rounded-lg cursor-not-allowed'>
                            Locked
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const VideoComponent = () => {
    const videoData = [
        {
            id: 1,
            title: "How to install the Kmoove",
            youtubeLink: "https://www.youtube.com/watch?v=example1",
            thumbnail: "/assets/install.png",
            isLocked: true,
        },
        {
            id: 2,
            title: "Game presentation videos",
            youtubeLink: "https://www.youtube.com/watch?v=example2",
            thumbnail: "/assets/game.png",
            isLocked: true,
        },
        {
            id: 3,
            title: "Editor presentation and training videos",
            youtubeLink: "https://www.youtube.com/watch?v=example3",
            thumbnail: "/assets/editor.png",
            isLocked: true,
        },
    ];

    return (
        <div className='flex flex-wrap gap-4 w-full'>
            {videoData.map((video) => (
                <VideoCard
                    key={video.id}
                    title={video.title}
                    youtubeLink={video.youtubeLink}
                    thumbnail={video.thumbnail}
                    isLocked={video.isLocked}
                />
            ))}
        </div>
    );
};
