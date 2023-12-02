
const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="md:w-3/12 mx-auto text-center py-8">
            <p className="text-yellow-600 italic">---{subHeading}---</p>
            <h3 className="text-xl font-semibold border-y-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;