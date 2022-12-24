import FeedSuggestionOption from "../FeedSuggestionOption/FeedSuggestionOption";

const FeedSuggestionOptionList = ({ suggestedUsers }) => {

  return suggestedUsers.map(({ _id, profile, firstname, lastname, description }) => (
    <FeedSuggestionOption
      key={_id}
      profile={profile}
      firstname={firstname}
      lastname={lastname}
      description={description}
    />
  ))
};

export default FeedSuggestionOptionList;
