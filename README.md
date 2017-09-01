# Mini anonymous review Github badges

A ridiculously simple ui for building out-of-5 SVG badges that automatically update every time someone adds a review.

It uses Github OAuth to help protect against fake reviewers.

### Making it do the thing

1. Hop over to our temporary url http://52.50.84.179 
1. Sign in through Github.
1. Pick a name for your review (has to be under 15 characters... Dunno why. Oops. The validation is also pretty bad, maybe stick to just standard characters and no spaces for now. At some point soon I will fix this.).
1. Add a review of your own by clicking one of the numbered buttons.
1. To embed the review svg with a link, copy the text in the input underneath the five review buttons.
1. To share the review link copy/paste the page url.

#### Only the most recent review from each user will be counted

### Image caching

Github is really annoying about image caching so sometimes it takes a while to update the image.

As an example, below is the review link for this repo. Feel free to a leave a review of your own :sparkles:

<a href='http://52.50.84.179/badge/mini%20reviews'><img src='http://52.50.84.179/badge-svg/mini%20reviews.svg' alt='rating badge' height='22' /></a>
