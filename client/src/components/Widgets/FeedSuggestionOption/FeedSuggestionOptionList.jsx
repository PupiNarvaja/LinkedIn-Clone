import FeedSuggestionOption from "../FeedSuggestionOption/FeedSuggestionOption";

const FeedSuggestionOptionList = ({ suggestedUsers }) => {
  return suggestedUsers.map(({ id, profile, firstname, lastname, description }) => (
    <FeedSuggestionOption
      key={id}
      profile={profile}
      firstname={firstname}
      lastname={lastname}
      description={description}
    />
  ))
};

export default FeedSuggestionOptionList;
