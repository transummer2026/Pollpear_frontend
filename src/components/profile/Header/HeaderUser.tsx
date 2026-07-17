import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";
import HeaderUserHashtags from "./HeaderUserHashtags";
import HeaderUserScores from "./HeaderUserScores";

const user = {
  name: "PierrEric",
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis",
  hashtags: ["#polls", "#crocs", "#Valais", "#vibeconding", "claude"],
  scores: {
    pollsCreated: 10,
    rooms: 50,
    friends: 100,
    scores: 75,
  },
};

export default function HeaderUser() {
  return (
    <Card>
      <CardHeader className="space-y-2">

        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          
          <CardTitle className="text-lg font-bold">
            {user.name}
          </CardTitle>
          <div className="flex gap-2">
            <Button asChild variant="outline" >
              <Link to="/settings">Settings</Link>
            </Button>
            <Button variant="outline" >
              Edit Profile
            </Button>
          </div>
        </div>
          <CardDescription>
              {user.description}
          </CardDescription>
        
      </CardHeader>
      
      <Separator />
      
      <CardContent className="space-y-2 pt-2">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 mx-auto  max-w-7xl  gap-4 p-4">  
          <div className="lg:col-span-4 md:col-span-2">
            <HeaderUserScores scores={user.scores} />
          </div>
          <div className="space-y-3 lg:col-span-1">
            <HeaderUserHashtags hashtags={user.hashtags} />
          </div>
        </div>
      </CardContent>
    
    </Card>
  );
}
